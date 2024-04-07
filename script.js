function toggleTable() {
    var container = document.getElementById("statistics-table-container");
    container.classList.toggle("show");
    var button = document.querySelector(".toggle-button");
    if (container.classList.contains("show")) {
        button.textContent = "통계 표 숨기기";
    } else {
        button.textContent = "통계 표 보이기";
    }
}

function generateLottoNumbers() {
    var numbers = [];
    var table = document.getElementById("statistics-table");
    var rows = table.getElementsByTagName("tr");

    // 통계 표에서 나온 횟수가 10 이상인 숫자들을 numbers 배열에 추가
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var frequency = parseInt(cells[1].innerText);
        if (frequency >= 12) {
            numbers.push(parseInt(cells[0].innerText));
        }
    }

    // 중복 제거
    var uniqueNumbers = Array.from(new Set(numbers));

    // 숫자 정렬
    uniqueNumbers.sort(function(a, b) {
        return a - b;
    });

    // numbers 배열에서 무작위로 6개의 숫자를 5번 뽑아서 표에 추가
    var lottoNumbersTable = document.getElementById("lotto-numbers-table");
    lottoNumbersTable.innerHTML = "<tr><th>로또 번호</th></tr>";
    for (var j = 0; j < 5; j++) {
        var lottoNumbers = [];
        for (var k = 0; k < 6; k++) {
            // 중복이 없는 숫자를 무작위로 뽑기
            var randomIndex = Math.floor(Math.random() * uniqueNumbers.length);
            lottoNumbers.push(uniqueNumbers[randomIndex]);
            // 뽑은 숫자는 uniqueNumbers 배열에서 제거하여 중복 뽑히지 않도록 함
            uniqueNumbers.splice(randomIndex, 1);
        }
        // 뽑은 숫자들을 오름차순 정렬하여 표에 추가
        lottoNumbers.sort(function(a, b) {
            return a - b;
        });
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.textContent = lottoNumbers.join(", ");
        row.appendChild(cell);
        lottoNumbersTable.appendChild(row);
    }

    // 결과를 보여주는 컨테이너 표시
    var lottoNumbersContainer = document.getElementById("lotto-numbers-container");
    lottoNumbersContainer.style.display = "block";

    // "로또 번호표 숨기기" 버튼 표시
    var toggleLottoNumbersButton = document.getElementById("toggle-lotto-numbers");
    toggleLottoNumbersButton.style.display = "inline-block";
}

function toggleLottoNumbersTable() {
    var lottoNumbersContainer = document.getElementById("lotto-numbers-container");
    if (lottoNumbersContainer.style.display === "none") {
        lottoNumbersContainer.style.display = "block";
    } else {
        lottoNumbersContainer.style.display = "none";
    }
}


// "회"를 숫자 뒤에 붙이는 함수
function addSuffixToNumbers() {
    var table = document.getElementById("statistics-table");
    var rows = table.getElementsByTagName("tr");
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].getElementsByTagName("td");
        var frequency = cells[1].innerHTML;
        cells[1].innerHTML = frequency + "회";
    }
}

// 페이지가 로드될 때 함수 실행
window.onload = function() {
    addSuffixToNumbers();
};
