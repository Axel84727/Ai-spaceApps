// main.js
document.getElementById("exoplanetForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // Convertir todos los valores a float
    Object.keys(data).forEach(k => data[k] = parseFloat(data[k]));

    // Agregar las 5 features derivadas, usando las mismas keys originales
    data.depth_per_duration = data.pl_trandep / data.pl_trandur;
    data.insol_per_radius2 = data.pl_insol / (data.pl_rade ** 2);
    data.radius_teff_ratio = data.pl_rade / data.st_teff;
    data.insol_orbper_ratio = data.pl_insol / data.pl_orbper;
    data.logg_teff_product = data.st_logg * data.st_teff;

    const resultDiv = document.getElementById("resultado");

    try {
        const res = await fetch("https://mi-backend.onrender.com/predict", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
});


        const result = await res.json();

        if (result.error) {
            resultDiv.innerHTML = `<span class="text-danger">Error: ${result.error}</span>`;
        } else {
            const color = result.prediction === "Exoplaneta" ? "text-success" : "text-warning";
            resultDiv.innerHTML = `
                <span class="${color}">${result.prediction}</span><br>
                <small>Probabilidad: ${(result.probability * 100).toFixed(2)}%</small>
            `;
        }
    } catch (err) {
        resultDiv.innerHTML = `<span class="text-danger">Error: ${err.message}</span>`;
    }
});

