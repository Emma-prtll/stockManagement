import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { useCarHistoryStore } from "../store/carHistoryStore.js";

const StockLineChart = () => {
    const svgRef = useRef();
    const [chartData, setChartData] = useState([]);

    const carsHistory = useCarHistoryStore((state) => state.carsHistory);
    const getCarsHistorical = useCarHistoryStore((state) => state.getCarsHistorical);
    const historyLoading = useCarHistoryStore((state) => state.historyLoading);

    // ════════════════════════════════════════════
    // ÉTAPE 1 : CHARGER LES DONNÉES
    // ════════════════════════════════════════════
    useEffect(() => {
        getCarsHistorical();
    }, []);

    // ════════════════════════════════════════════
    // ÉTAPE 2 : TRAITER LES DONNÉES
    // ════════════════════════════════════════════
    useEffect(() => {
        if (carsHistory.length === 0) return;

        console.log("Données brutes:", carsHistory);

        // Grouper par date et calculer le stock total
        const stockByDate = {};

        carsHistory.forEach(entry => {
            // Extraire juste la date (sans l'heure)
            const dateOnly = entry.createdAt.split('T')[0]; // "2025-01-27"

            // Si cette date existe déjà, additionner
            if (stockByDate[dateOnly]) {
                stockByDate[dateOnly] += entry.currentStock;
            } else {
                stockByDate[dateOnly] = entry.currentStock;
            }
        });

        // Convertir en array et trier par date
        const data = Object.keys(stockByDate).map(dateKey => ({
            date: new Date(dateKey),
            totalStock: stockByDate[dateKey]
        }));

        data.sort((a, b) => a.date - b.date);

        console.log("Données traitées:", data);
        setChartData(data);

    }, [carsHistory]);

    // ════════════════════════════════════════════
    // ÉTAPE 3 : DESSINER LE GRAPHIQUE
    // ════════════════════════════════════════════
    useEffect(() => {
        if (chartData.length === 0) return;

        // ─────────────────────────────────────
        // 3.1 DIMENSIONS
        // ─────────────────────────────────────
        const margin = { top: 20, right: 30, bottom: 50, left: 60 };
        const width = 800 - margin.left - margin.right;
        const height = 400 - margin.top - margin.bottom;

        // ─────────────────────────────────────
        // 3.2 NETTOYER L'ANCIEN SVG
        // ─────────────────────────────────────
        d3.select(svgRef.current).selectAll("*").remove();

        // ─────────────────────────────────────
        // 3.3 CRÉER LE SVG
        // ─────────────────────────────────────
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // ─────────────────────────────────────
        // 3.4 CRÉER LES ÉCHELLES
        // ─────────────────────────────────────

        // Échelle X (Dates)
        const xScale = d3.scaleTime()
            .domain([
                d3.min(chartData, d => d.date),
                d3.max(chartData, d => d.date)
            ])
            .range([0, width]);

        // Échelle Y (Stock)
        const yScale = d3.scaleLinear()
            .domain([0, d3.max(chartData, d => d.totalStock) * 1.1])
            .range([height, 0]);

        // ─────────────────────────────────────
        // 3.5 CRÉER LES AXES
        // ─────────────────────────────────────

        // Axe X (en bas)
        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale)
                .ticks(5)
                .tickFormat(d3.timeFormat("%d/%m"))
            );

        // Axe Y (à gauche)
        svg.append("g")
            .call(d3.axisLeft(yScale));

        // Label Y
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -50)
            .attr("x", -height / 2)
            .style("text-anchor", "middle")
            .text("Total Stock");

        // ─────────────────────────────────────
// 3.6 AJOUTER LA GRILLE
// ─────────────────────────────────────

// Grille horizontale (lignes Y)
        svg.append("g")
            .attr("class", "grid")
            .style("stroke", "#e0e0e0")
            .style("stroke-width", "1")
            .style("stroke-dasharray", "3,3")
            .call(d3.axisLeft(yScale)
                .ticks(5)
                .tickSize(-width)
                .tickFormat("")
            );

        // Grille verticale (lignes X)
        svg.append("g")
            .attr("class", "grid")
            .attr("transform", `translate(0, ${height})`)
            .style("stroke", "#e0e0e0")
            .style("stroke-width", "1")
            .style("stroke-dasharray", "3,3")
            .call(d3.axisBottom(xScale)
                .ticks(5)
                .tickSize(-height)
                .tickFormat("")
            );

        // ─────────────────────────────────────
        // 3.6 CRÉER LA LIGNE
        // ─────────────────────────────────────

        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.totalStock));

        // Dessiner la ligne
        svg.append("path")
            .datum(chartData)
            .attr("fill", "none")
            .attr("stroke", "#2563eb")
            .attr("stroke-width", 3)
            .attr("d", line);

        // ─────────────────────────────────────
        // 3.7 AJOUTER DES POINTS
        // ─────────────────────────────────────

        svg.selectAll(".dot")
            .data(chartData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.totalStock))
            .attr("r", 5)
            .attr("fill", "#2563eb");

    }, [chartData]);

    // ════════════════════════════════════════════
    // RENDER
    // ════════════════════════════════════════════
    if (historyLoading) {
        return (
            <Card>
                <CardBody>
                    <Typography>Loading chart...</Typography>
                </CardBody>
            </Card>
        );
    }

    if (chartData.length === 0) {
        return (
            <Card>
                <CardBody>
                    <Typography>No data available</Typography>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card>
            <CardBody>
                <Typography variant="h5" className="mb-4">
                    Stock Evolution
                </Typography>
                <svg ref={svgRef}></svg>
            </CardBody>
        </Card>
    );
};

export default StockLineChart;