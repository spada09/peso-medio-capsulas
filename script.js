document.getElementById("btnCalcular").addEventListener("click", function () {
  const inputs = document.querySelectorAll("#inputs input");
  let valores = [];

  
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

  // cálculo do peso médio
  const soma = valores.reduce((a, b) => a + b, 0);
  const media = soma / valores.length;

  // cápsula mais leve e mais pesada
  const min = Math.min(...valores);
  const max = Math.max(...valores);

  // variação em relação ao peso médio 
  const variacaoMin = ((min - media) / media) * 100;
  const variacaoMax = ((max - media) / media) * 100;

  // conformidade 
  const dentroTolerancia = variacaoMin >= -10 && variacaoMax <= 10;

  
  const qtd = parseInt(document.getElementById("quantidade").value);
  let totalPeso = null;
  if (!isNaN(qtd) && qtd > 0) {
    totalPeso = qtd * media;
  }

  // resultado 
  let resultadoHTML = `
    <p><strong>Peso médio:</strong> ${media.toFixed(3)} g</p>
    <p><strong>Mais leve:</strong> ${min.toFixed(3)} g (${variacaoMin.toFixed(3)}%)</p>
    <p><strong>Mais pesada:</strong> ${max.toFixed(3)} g (${variacaoMax.toFixed(3)}%)</p>
    <p><strong>Status:</strong> ${dentroTolerancia ? "✅ Conforme" : "❌ Não conforme"}</p>
  `;

  if (totalPeso !== null) {
    resultadoHTML += `<p><strong>Peso total das cápsulas :</strong> ${totalPeso.toFixed(3)} g</p>`;
  }

  document.getElementById("resultado").innerHTML = resultadoHTML;
});