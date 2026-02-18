<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Расчет стоимости доставки</title>
    <style>
        body { font-family: sans-serif; margin: 40px; background: #f4f4f9; }
        .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); max-width: 500px; }
        .field { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input, select { width: 100%; padding: 8px; box-sizing: border-box; }
        button { background: #007bff; color: white; border: none; padding: 10px 20px; cursor: pointer; border-radius: 4px; }
        #result { margin-top: 20px; padding: 10px; border: 1px solid #ccc; display: none; }
        .error { color: red; border-color: red; }
        .success { color: green; border-color: green; }
    </style>
</head>
<body>

<div class="container">
    <h2>Калькулятор доставки</h2>
    <div class="field">
        <label for="weight">Вес посылки (кг):</label>
        <input type="text" id="weight" placeholder="Например: 15.5">
    </div>

    <div class="field">
        <label for="size">Сумма сторон (см):</label>
        <input type="number" id="size" placeholder="До 150 см">
    </div>
    <div class="field">
        <label for="packType">Тип груза:</label>
        <select id="packType">
            <option value="standard">Стандартный</option>
            <option value="fragile">Хрупкий (+20% к цене)</option>
            <option value="liquid">Жидкости (Запрещено для авиа)</option>
        </select>
    </div>
    <button onclick="calculate()">Рассчитать тариф</button>
    <div id="result"></div>
</div>
<script>
    function calculate() {
        const weightInput = document.getElementById('weight').value.replace(',', '.');
        const weight = parseFloat(weightInput);
        const resultDiv = document.getElementById('result');
        resultDiv.style.display = 'block';
        resultDiv.className = '';
        if (isNaN(weight)) {
            resultDiv.innerText = "Некорректный формат";
            resultDiv.classList.add('error');
            return;
        }
        if (weight < 0.1) {
            resultDiv.innerText = "Слишком легкий груз";
            resultDiv.classList.add('error');
        }
        else if (weight >= 0.1 && weight <= 1.0) {
            resultDiv.innerText = "Тариф: Микро (Фиксированная цена)";
            resultDiv.classList.add('success');
        }
        else if (weight > 1.0 && weight < 20.0) {
            resultDiv.innerText = "Тариф: Стандарт (Цена за кг)";
            resultDiv.classList.add('success');
        }
        else if (weight >= 20.1 && weight <= 50.0) {
            resultDiv.innerText = "Тариф: Тяжеловес (Нужна доплата)";
            resultDiv.classList.add('success');
        }
        else if (weight > 50.0) {
            resultDiv.innerText = "Обратитесь в отдел карго-перевозок";
            resultDiv.classList.add('error');
        }
    }
</script>
</body>
</html>
