import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useCarStore } from "../store/carStore";

const LinearChart = () => {
    const cars = useCarStore((state) => state.cars);
    const getCars = useCarStore((state) => state.getCars);
    const svgRef = useRef();

    // 🔹 Charger les données depuis la BDD
    useEffect(() => {
        getCars();
    }, []);

    // 🔹 Dessiner le graphique quand cars change
    useEffect(() => {
        if (!cars || cars.length === 0) return;

        d3.select(svgRef.current).selectAll("*").remove();

        const width = 600;
        const height = 300;
        const margin = { top: 20, right: 20, bottom: 40, left: 50 };

        const svg = d3
            .select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        const data = cars.map((car, index) => ({
            x: index,
            y: car.currentStock,
        }));

        const xScale = d3
            .scaleLinear()
            .domain([0, data.length - 1])
            .range([margin.left, width - margin.right]);

        const yScale = d3
            .scaleLinear()
            .domain([0, d3.max(data, (d) => d.y)])
            .nice()
            .range([height - margin.bottom, margin.top]);

        svg.append("g")
            .attr("transform", `translate(0, ${height - margin.bottom})`)
            .call(d3.axisBottom(xScale));

        svg.append("g")
            .attr("transform", `translate(${margin.left}, 0)`)
            .call(d3.axisLeft(yScale));

        const line = d3
            .line()
            .x((d) => xScale(d.x))
            .y((d) => yScale(d.y));

        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#2563eb")
            .attr("stroke-width", 3)
            .attr("d", line);

    }, [cars]);

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Stock Overview</h2>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default LinearChart;
