import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Typography, Card, CardBody } from "@material-tailwind/react";
import { useCarHistoryStore } from "../store/carHistoryStore.js";

const StockLineChart = () => {
    const svgRef = useRef();
    const [processedData, setProcessedData] = useState([]);

    const carsHistory = useCarHistoryStore((state) => state.carsHistory);
    const getCarsHistorical = useCarHistoryStore((state) => state.getCarsHistorical);
    const historyLoading = useCarHistoryStore((state) => state.historyLoading);

    // ============================================
    // ÉTAPE 1 : RÉCUPÉRER LES DONNÉES
    // ============================================
    useEffect(() => {
        getCarsHistorical();
    }, []);

    // ============================================
    // ÉTAPE 2 : TRAITER LES DONNÉES
    // ============================================
    useEffect(() => {
        if (carsHistory.length === 0) return;

        console.log("Données brutes reçues:", carsHistory);

        // ────────────────────────────────────────
        // 2.1 GROUPER PAR DATE ET CALCULER LE TOTAL
        // ────────────────────────────────────────

        // Créer un objet Map pour regrouper par date
        const stockByDate = new Map();

        carsHistory.forEach(entry => {
            // Convertir la date en format "YYYY-MM-DD" pour regrouper par jour
            const date = new Date(entry.createdAt);
            const dateKey = date.toISOString().split('T')[0]; // "2025-01-15"

            // Si cette date existe déjà, additionner le stock
            if (stockByDate.has(dateKey)) {
                stockByDate.set(dateKey, stockByDate.get(dateKey) + entry.currentStock);
            } else {
                // Sinon, créer une nouvelle entrée
                stockByDate.set(dateKey, entry.currentStock);
            }
        });

        // ────────────────────────────────────────
        // 2.2 CONVERTIR EN ARRAY ET TRIER PAR DATE
        // ────────────────────────────────────────

        const formattedData = Array.from(stockByDate, ([dateKey, totalStock]) => ({
            date: new Date(dateKey),
            totalStock: totalStock
        }));

        // Trier par date (important pour le line chart!)
        formattedData.sort((a, b) => a.date - b.date);

        console.log("Données traitées pour le graphique:", formattedData);

        setProcessedData(formattedData);
    }, [carsHistory]);

    // ============================================
    // ÉTAPE 3 : DESSINER LE GRAPHIQUE
    // ============================================
    useEffect(() => {
        if (processedData.length === 0) return;

        // ────────────────────────────────────────
        // 3.1 DÉFINIR LES DIMENSIONS
        // ────────────────────────────────────────
        const margin = { top: 40, right: 50, bottom: 70, left: 80 };
        const width = 900 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;

        // ────────────────────────────────────────
        // 3.2 NETTOYER LE SVG PRÉCÉDENT
        // ────────────────────────────────────────
        d3.select(svgRef.current).selectAll("*").remove();

        // ────────────────────────────────────────
        // 3.3 CRÉER LE SVG
        // ────────────────────────────────────────
        const svg = d3.select(svgRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`);

        // ────────────────────────────────────────
        // 3.4 CRÉER LES ÉCHELLES
        // ────────────────────────────────────────

        // Échelle X : Temps (Date)
        const xScale = d3.scaleTime()
            .domain(d3.extent(processedData, d => d.date))
            .range([0, width]);

        // Échelle Y : Stock Total
        const maxStock = d3.max(processedData, d => d.totalStock);
        const yScale = d3.scaleLinear()
            .domain([0, maxStock * 1.2])  // +20% pour ajouter de l'espace en haut
            .range([height, 0]);

        // ────────────────────────────────────────
        // 3.5 CRÉER LES AXES
        // ────────────────────────────────────────

        // Axe X
        const xAxis = d3.axisBottom(xScale)
            .ticks(d3.timeDay.every(1))  // Une graduation par jour
            .tickFormat(d3.timeFormat("%d %b"));  // Format: "15 Jan"

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "12px")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-45)");  // Rotation pour éviter les chevauchements

        // Label axe X
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text("Date");

        // Axe Y
        const yAxis = d3.axisLeft(yScale)
            .ticks(8);

        svg.append("g")
            .call(yAxis)
            .selectAll("text")
            .style("font-size", "12px");

        // Label axe Y
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 20)
            .attr("x", 0 - (height / 2))
            .style("text-anchor", "middle")
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .text("Stock Total");

        // ────────────────────────────────────────
        // 3.6 AJOUTER UNE GRILLE
        // ────────────────────────────────────────

        // Grille horizontale
        svg.append("g")
            .attr("class", "grid")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.3)
            .call(d3.axisLeft(yScale)
                .ticks(8)
                .tickSize(-width)
                .tickFormat("")
            );

        // Grille verticale
        svg.append("g")
            .attr("class", "grid")
            .style("stroke-dasharray", "3,3")
            .style("opacity", 0.2)
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(xScale)
                .ticks(d3.timeDay.every(1))
                .tickSize(-height)
                .tickFormat("")
            );

        // ────────────────────────────────────────
        // 3.7 CRÉER LE GÉNÉRATEUR DE LIGNE
        // ────────────────────────────────────────

        const line = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.totalStock))
            .curve(d3.curveMonotoneX);  // Courbe lisse

        // ────────────────────────────────────────
        // 3.8 DESSINER LA LIGNE AVEC ANIMATION
        // ────────────────────────────────────────

        const path = svg.append("path")
            .datum(processedData)
            .attr("fill", "none")
            .attr("stroke", "#2563eb")
            .attr("stroke-width", 3)
            .attr("d", line);

        // Animation : dessiner la ligne progressivement
        const totalLength = path.node().getTotalLength();
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(2000)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);

        // ────────────────────────────────────────
        // 3.9 AJOUTER DES POINTS AVEC TOOLTIP
        // ────────────────────────────────────────

        // Créer un tooltip (div invisible)
        const tooltip = d3.select("body")
            .append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("background", "rgba(0, 0, 0, 0.8)")
            .style("color", "white")
            .style("padding", "10px 15px")
            .style("border-radius", "8px")
            .style("font-size", "14px")
            .style("pointer-events", "none")
            .style("opacity", 0)
            .style("z-index", 1000);

        svg.selectAll(".dot")
            .data(processedData)
            .enter()
            .append("circle")
            .attr("class", "dot")
            .attr("cx", d => xScale(d.date))
            .attr("cy", d => yScale(d.totalStock))
            .attr("r", 0)  // Commencer avec rayon 0 pour l'animation
            .attr("fill", "#2563eb")
            .attr("stroke", "white")
            .attr("stroke-width", 2)
            .style("cursor", "pointer")
            // Animation d'apparition
            .transition()
            .delay((d, i) => i * 100)
            .duration(500)
            .attr("r", 5)
            .end()
            .then(() => {
                // Ajouter les événements après l'animation
                svg.selectAll(".dot")
                    .on("mouseover", function(event, d) {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("r", 8);

                        tooltip
                            .style("opacity", 1)
                            .html(`
                                <strong>Date:</strong> ${d3.timeFormat("%d/%m/%Y")(d.date)}<br/>
                                <strong>Stock Total:</strong> ${d.totalStock} véhicules
                            `)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mousemove", function(event) {
                        tooltip
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px");
                    })
                    .on("mouseout", function() {
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .attr("r", 5);

                        tooltip.style("opacity", 0);
                    });
            });

        // ────────────────────────────────────────
        // 3.10 AJOUTER UN TITRE
        // ────────────────────────────────────────

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -15)
            .style("text-anchor", "middle")
            .style("font-size", "18px")
            .style("font-weight", "bold")
            .style("fill", "#1e40af")
            .text("Évolution du Stock Total de Véhicules");

        // Cleanup du tooltip quand le composant se démonte
        return () => {
            d3.selectAll(".d3-tooltip").remove();
        };

    }, [processedData]);

    // ============================================
    // RENDER
    // ============================================
    if (historyLoading) {
        return (
            <Card className="mt-6">
                <CardBody className="flex justify-center items-center h-96">
                    <Typography variant="h5" color="blue-gray">
                        Chargement du graphique...
                    </Typography>
                </CardBody>
            </Card>
        );
    }

    if (processedData.length === 0) {
        return (
            <Card className="mt-6">
                <CardBody className="flex justify-center items-center h-96">
                    <Typography variant="h5" color="blue-gray">
                        Aucune donnée d'historique disponible
                    </Typography>
                </CardBody>
            </Card>
        );
    }

    return (
        <Card className="mt-6">
            <CardBody>
                <svg ref={svgRef}></svg>

                {/* Statistiques supplémentaires */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                            Stock Actuel
                        </Typography>
                        <Typography variant="h4" color="blue">
                            {processedData[processedData.length - 1]?.totalStock || 0}
                        </Typography>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                            Stock Maximum
                        </Typography>
                        <Typography variant="h4" color="green">
                            {d3.max(processedData, d => d.totalStock)}
                        </Typography>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                        <Typography variant="small" color="blue-gray" className="font-semibold">
                            Stock Minimum
                        </Typography>
                        <Typography variant="h4" color="orange">
                            {d3.min(processedData, d => d.totalStock)}
                        </Typography>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default StockLineChart;