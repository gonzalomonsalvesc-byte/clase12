// ENDPOINT: usa tu JSON propio de la evaluación pasada
const ENDPOINT = "https://api.myjson.online/v1/records/84587cf8-bdfc-4e9a-92bf-4911c841a171";

// Referencias a las 3 tbody
const tbodyAmerica = document.querySelector("#america");
const tbodyEuropa = document.querySelector("#europa");
const tbodyOtros = document.querySelector("#otros");

const paisesAmerica = ["Argentina", "Brazil", "Canada", "Chile", "Colombia", "Mexico", "United States"];
const paisesEuropa = ["Austria", "Belgium", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Ireland", "Italy", "Netherlands", "Sweden", "Switzerland", "United Kingdom"];

let htmlAmerica = "";
let htmlEuropa = "";
let htmlOtros = "";

fetch(ENDPOINT)
    .then(respuesta => {
        if (!respuesta.ok) throw new Error("Error HTTP: " + respuesta.status);
        return respuesta.json();
    })
    .then(datos => {
        const escuelas = datos.data.data ? datos.data.data : datos.data;

        escuelas.forEach(e => {
            const esAmericana = paisesAmerica.some(p => e.location.includes(p));
            const esEuropea = paisesEuropa.some(p => e.location.includes(p));
            const pais = e.location.split(", ").pop();
            const fila = `<tr><th>${e.rank}</th><td>${e.name}</td><td>${pais}</td></tr>`;

            if (esAmericana) { htmlAmerica += fila; }
            else if (esEuropea) { htmlEuropa += fila; }
            else { htmlOtros += fila; }
        });

        tbodyAmerica.innerHTML = htmlAmerica;
        tbodyEuropa.innerHTML = htmlEuropa;
        tbodyOtros.innerHTML = htmlOtros;
    })
    .catch(error => console.error("Error:", error));

// ============================================
// CHART.JS: Distribución de las 322 instituciones americanas
// ============================================
new Chart(document.getElementById("identidad"), {
    type: "bar",
    data: {
        labels: ["Estados Unidos","Canadá","Brasil","México","Chile","Argentina","Colombia","Perú","Ecuador","Otros"],
        datasets: [{
            label: "Instituciones en QS World University Ranking",
            data: [184, 30, 22, 18, 17, 10, 8, 6, 5, 22],
            backgroundColor: "rgba(31, 85, 146, 0.7)",
            borderColor: "rgb(31, 85, 146)",
            borderWidth: 1,
        }],
    },
    options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1,
        plugins: {
            title: {
                display: true,
                text: "Distribución de las 322 instituciones americanas",
                font: { family: "Work Sans", size: 14 }
            }
        }
    }
});