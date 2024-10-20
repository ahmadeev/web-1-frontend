const svgNS = "http://www.w3.org/2000/svg";

const SIZE = 250
const CENTER = SIZE / 2
const R = 80

const ZERO_ZERO = `${CENTER}, ${CENTER}`
const ZERO_HALF_R = `${CENTER}, ${CENTER - R / 2}`
const ZERO_R = `${CENTER}, ${CENTER - R}`
const ZERO_MINUS_HALF_R = `${CENTER}, ${CENTER + R / 2}`
const ZERO_MINUS_R = `${CENTER}, ${CENTER + R}`
const HALF_R_ZERO = `${CENTER + R / 2}, ${CENTER}`
const R_ZERO = `${CENTER + R}, ${CENTER}`
const MINUS_HALF_R_ZERO = `${CENTER - R / 2}, ${CENTER}`
const MINUS_R_ZERO = `${CENTER - R}, ${CENTER}`

function form_polygon_string(points) {
    return points.join(" ")
}

//  points = [ point_L, point_A, angle, point_end ]; point = [ "x1,y1", "r,r", "90,0,0", "x2,y2" ]
function form_path_string(d) {
    const point_L = d["L"]          //   соединяется с центром
    const point_A = d["A"]          //   радиус
    const angle = d["ANGLE"]        //   угол
    const point_end = d["END"]      //   конечная точка

    return `M ${CENTER} ${CENTER}, L ${point_L}, A ${point_A}, 0, 0, ${angle}, ${point_end}, Z`
}

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

//  функция отрисовки графика
function draw_graph(svg, polygon_points, path_points) {
    console.log("Начало отрисовки графика")
    let fill_color = "white"
    let stroke_color = "black"

    // Рисуем ось X (горизонтальная линия)
    //  .x-grid
    const xGrid = document.createElementNS(svgNS, "line");
    xGrid.setAttribute("stroke", "black");
    xGrid.setAttribute("x1", "0");
    xGrid.setAttribute("x2", "250");
    xGrid.setAttribute("y1", "125");
    xGrid.setAttribute("y2", "125");
    svg.appendChild(xGrid);

    // Рисуем ось Y (вертикальная линия)
    //  .y-grid
    const yGrid = document.createElementNS(svgNS, "line");
    yGrid.setAttribute("stroke", "black");
    yGrid.setAttribute("x1", "125");
    yGrid.setAttribute("x2", "125");
    yGrid.setAttribute("y1", "0");
    yGrid.setAttribute("y2", "250");
    svg.appendChild(yGrid);

    // Добавляем подписи осей
    //  .grid-labels
    const yLabel = document.createElementNS(svgNS, "text");
    yLabel.setAttribute("x", "135");
    yLabel.setAttribute("y", "15");
    yLabel.textContent = "Y";
    svg.appendChild(yLabel);

    const xLabel = document.createElementNS(svgNS, "text");
    xLabel.setAttribute("x", "235");
    xLabel.setAttribute("y", "105");
    xLabel.textContent = "X";
    svg.appendChild(xLabel);

    // Рисуем стрелку на оси Y
    const yArrow = document.createElementNS(svgNS, "polygon");
    yArrow.setAttribute("fill", "black");
    yArrow.setAttribute("points", "125, 0 130, 10 120, 10");
    yArrow.setAttribute("stroke", "black");
    svg.appendChild(yArrow);

    // Рисуем стрелку на оси X
    const xArrow = document.createElementNS(svgNS, "polygon");
    xArrow.setAttribute("fill", "black");
    xArrow.setAttribute("points", "250, 125 240, 120 240, 130");
    xArrow.setAttribute("stroke", "black");
    svg.appendChild(xArrow);

    //  отрисовка polygon
    for (let quarter in polygon_points) {
        if (polygon_points[quarter] === "") {
            continue
        }
        create_polygon(svg, polygon_points[quarter], fill_color, stroke_color)
        console.log("(polygon) отрисована четверть №" + quarter)
    }

    //  отрисовка path
    for (let quarter in path_points) {
        if (path_points[quarter] === "") {
            continue
        }
        create_path(svg, path_points[quarter], fill_color, stroke_color)
        console.log("(path) отрисована четверть №" + quarter)
    }

    // Рисуем метки на оси X
    //  .labels .x-labels
    const labelsX = [
        { x: 45, y: 140, text: "-R" },
        { x: 85, y: 140, text: "-R/2" },
        { x: 165, y: 140, text: "R/2" },
        { x: 205, y: 140, text: "R" }
    ];

    labelsX.forEach(label => {
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", label.x);
        text.setAttribute("y", label.y);
        text.textContent = label.text;
        svg.appendChild(text);
    });

    // Рисуем метки на оси Y
    //  .labels .y-labels
    const labelsY = [
        { x: 130, y: 205, text: "-R" },
        { x: 130, y: 165, text: "-R/2" },
        { x: 130, y: 85, text: "R/2" },
        { x: 130, y: 45, text: "R" }
    ];

    labelsY.forEach(label => {
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", label.x);
        text.setAttribute("y", label.y);
        text.textContent = label.text;
        svg.appendChild(text);
    });

    // Рисуем горизонтальные деления (метки оси Y)
    //  .pridumaupozhe
    const yTicks = [205, 165, 85, 45];
    yTicks.forEach(y => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("stroke", "black");
        line.setAttribute("x1", "122");
        line.setAttribute("x2", "128");
        line.setAttribute("y1", y);
        line.setAttribute("y2", y);
        svg.appendChild(line);
    });

    // Рисуем вертикальные деления (метки оси X)
    //  .pridumaupozhe
    const xTicks = [205, 165, 85, 45];
    xTicks.forEach(x => {
        const line = document.createElementNS(svgNS, "line");
        line.setAttribute("stroke", "black");
        line.setAttribute("y1", "122");
        line.setAttribute("y2", "128");
        line.setAttribute("x1", x);
        line.setAttribute("x2", x);
        svg.appendChild(line);
    });

    console.log("График успешно отрисован!")
}

//  функция отрисовки треугольника или прямоугольника (polygon)
function create_polygon(svg, points, fill_color, stroke_color) {
    const polygon = document.createElementNS(svgNS, "polygon")
    polygon.setAttribute("points", points)
    polygon.setAttribute("fill", fill_color)
    polygon.setAttribute("stroke", stroke_color)

    svg.appendChild(polygon);
}

//  функция отрисовки части круга (path)
function create_path(svg, d, fill_color, stroke_color) {
    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", fill_color);
    path.setAttribute("stroke", stroke_color);

    svg.appendChild(path);
}
