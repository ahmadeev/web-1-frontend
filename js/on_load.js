window.onload = () => {
    const svg = document.querySelector('svg')
    draw_graph(svg, polygon_points, path_points)
    restoreTableAfterRefresh();
}