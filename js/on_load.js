//----------------------------------------тут задаются треугольник и четырехугольник
let polygon_points = {
    2: form_polygon_string([ZERO_ZERO, HALF_R_ZERO, ZERO_MINUS_R]),
    3: form_polygon_string([ZERO_ZERO, ZERO_MINUS_HALF_R, `${CENTER - R}, ${CENTER + R / 2}`, MINUS_R_ZERO]),
}

//----------------------------------------тут задается четверть круга
let path_points = {
    1: form_path_string({
        "L"     : HALF_R_ZERO,
        "A"     : `${R / 2}, ${R / 2}`,
        "ANGLE" : "0",
        "END"   : ZERO_HALF_R
    }),
}

window.onload = () => {
    const svg = document.querySelector('svg')
    draw_graph(svg, polygon_points, path_points)
    restoreTableAfterRefresh();
}