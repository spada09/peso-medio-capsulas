document.getElementById("btnCalcular").addEventListener("click", function () {
  const inputs = document.querySelectorAll("#inputs input");
  let valores = [];

  // Captura o número do pedido
  const pedido = document.querySelector("input[placeholder='Req']").value;

  inputs.forEach(input => {
    let v = parseFloat(input.value);
    if (!isNaN(v)) {
      valores.push(v);
    }
  });

  if (valores.length === 0) {
    document.getElementById("resultado").innerHTML = "<p>Por favor, insira os valores.</p>";
    return;
  }

  const soma = valores.reduce((a, b) => a + b, 0);
  const media = soma / valores.length;

  const min = Math.min(...valores);
  const max = Math.max(...valores);

  const variacaoMin = ((min - media) / media) * 100;
  const variacaoMax = ((max - media) / media) * 100;

  const dentroTolerancia = variacaoMin >= -10 && variacaoMax <= 10;

  const qtd = parseInt(document.getElementById("quantidade").value);
  let totalPeso = null;
  if (!isNaN(qtd) && qtd > 0) {
    totalPeso = qtd * media;
  }

  // Construir lista dos pesos individuais
  let listaPesosHTML = "<ul>";
  valores.forEach((peso, i) => {
    listaPesosHTML += `<li>Cápsula ${i + 1}: ${peso.toFixed(3)} g</li>`;
  });
  listaPesosHTML += "</ul>";

  // Construir resultado final
  let resultadoHTML = `
    <p><strong>Nº do pedido:</strong> ${pedido ? pedido : "Não informado"}</p>
    <p><strong>Peso médio:</strong> ${media.toFixed(3)} g</p>
    <p><strong>Mais leve:</strong> ${min.toFixed(3)} g (${variacaoMin.toFixed(3)}%)</p>
    <p><strong>Mais pesada:</strong> ${max.toFixed(3)} g (${variacaoMax.toFixed(3)}%)</p>
    <p><strong>Status:</strong> ${dentroTolerancia ? "✅ Conforme" : "❌ Não conforme"}</p>
    <p><strong>Pesos individuais:</strong></p>
    ${listaPesosHTML}
  `;

  if (totalPeso !== null) {
    resultadoHTML += `<p><strong>Peso total das cápsulas:</strong> ${totalPeso.toFixed(3)} g</p>`;
  }

  document.getElementById("resultado").innerHTML = resultadoHTML;
});


