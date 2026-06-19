import * as d3 from "d3";
import { useEffect, useMemo, useRef } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);

    // Жестко фиксированная аккуратная ширина и высота графика
    const width = 800;
    const height = 400;

    const margin = {
        top: 20,
        bottom: 80,
        left: 60,
        right: 20
    };

    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    const { oy = [true, false], chartType = "scatter" } = props;

    const allValues = useMemo(() => {
        return props.data.flatMap(d => {
            const vals = [];
            if (oy[0]) vals.push(d.values[1]);
            if (oy[1]) vals.push(d.values[0]);
            return vals;
        });
    }, [props.data, oy]);

    const [minVal, maxVal] = useMemo(() => d3.extent(allValues), [allValues]);

    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, Math.max(0, boundsWidth)])
            .padding(0.2);
    }, [props.data, boundsWidth]);

    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([Math.min(0, minVal || 0), (maxVal || 100) * 1.1])
            .range([Math.max(0, boundsHeight), 0]);
    }, [minVal, maxVal, boundsHeight]);

    useEffect(() => {
        if (props.data.length === 0) return;

        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();

        svg.attr("width", width)
            .attr("height", height);

        // Задний фон / Сетка
        svg.append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", boundsWidth)
            .attr("height", boundsHeight)
            .style("fill", "#fdfdfd")
            .style("stroke", "#ddd");

        // Ось X
        const xAxis = d3.axisBottom(scaleX);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top + boundsHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-25)");

        // Ось Y
        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);

        const colors = { max: "red", min: "blue" };

        if (chartType === "scatter") {
            const drawDots = (valueIndex, color) => {
                svg.selectAll(`.dot-${valueIndex}`)
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.values[valueIndex]))
                    .attr("r", 5)
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", color);
            };

            if (oy[0]) drawDots(1, colors.max);
            if (oy[1]) drawDots(0, colors.min);

        } else {
            const bandWidth = scaleX.bandwidth();
            const seriesCount = (oy[0] ? 1 : 0) + (oy[1] ? 1 : 0);
            const barWidth = seriesCount > 1 ? bandWidth / 2 : bandWidth;

            props.data.forEach(d => {
                let offsetIndex = 0;

                if (oy[0]) {
                    const barHeight = boundsHeight - scaleY(d.values[1]);
                    svg.append("rect")
                        .attr("x", margin.left + scaleX(d.labelX) + offsetIndex * barWidth)
                        .attr("y", margin.top + scaleY(d.values[1]))
                        .attr("width", barWidth)
                        .attr("height", Math.max(0, barHeight))
                        .style("fill", colors.max);
                    offsetIndex++;
                }

                if (oy[1]) {
                    const barHeight = boundsHeight - scaleY(d.values[0]);
                    svg.append("rect")
                        .attr("x", margin.left + scaleX(d.labelX) + offsetIndex * barWidth)
                        .attr("y", margin.top + scaleY(d.values[0]))
                        .attr("width", barWidth)
                        .attr("height", Math.max(0, barHeight))
                        .style("fill", colors.min);
                }
            });
        }

    }, [scaleX, scaleY, props.data, oy, chartType, boundsWidth, boundsHeight]);

    return (
        <div style={{ width: "100%", overflowX: "auto", marginTop: "20px" }}>
            <svg
                ref={chartRef}
                style={{
                    display: "block",
                    width: `${width}px`,
                    height: `${height}px`,
                    margin: "0 auto" // По центру страницы
                }}
            ></svg>
        </div>
    );
};

export default ChartDraw;