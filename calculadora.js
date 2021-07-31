onload = () => {
    document.querySelector('#bt-0').onclick = () => digito(0);
    document.querySelector('#bt-1').onclick = () => digito(1);
    document.querySelector('#bt-2').onclick = () => digito(2);
    document.querySelector('#bt-3').onclick = () => digito(3);
    document.querySelector('#bt-4').onclick = () => digito(4);
    document.querySelector('#bt-5').onclick = () => digito(5);
    document.querySelector('#bt-6').onclick = () => digito(6);
    document.querySelector('#bt-7').onclick = () => digito(7);
    document.querySelector('#bt-8').onclick = () => digito(8);
    document.querySelector('#bt-9').onclick = () => digito(9);
    document.querySelector('#bt-comma').onclick = virgula;
    document.querySelector('#bt-ac').onclick = clearDisplay;
    document.querySelector('#bt-plus').onclick = () => operation('+');
    document.querySelector('#bt-minus').onclick = () => operation('-');
    document.querySelector('#bt-times').onclick = () => operation('*');
    document.querySelector('#bt-divide').onclick = () => operation('/');
    document.querySelector('#bt-equals').onclick = calc;
}

// Variáveis para armazenar o valor, o operador e o estado da calculadora
let sValor = '';
let oldNumber = '';
let isNewNumber = true;
let op = '';

const atualizaVizor = () => {
    let [parteInteira, parteDecimal] = sValor.split(',');
    let count = 0;
    let v = ''; // criar uma string com o número formatado para saida
    let tamanhoParteInteira = parteInteira.toString().length;
    if (tamanhoParteInteira > 12) {
        let sNum = parseFloat(sValor.replace(',', '.')).toExponential(12) + '';
        let [numero, exp] = sNum.split('e');
        v = parseFloat(numero) + 'e' + exp;

    } else {

        for (let i = parteInteira.length - 1; i >= 0; i--) {
            if (++count > 3) {
                v = '.' + v;
                count = 1;
            }
            v = parteInteira.charAt(i) + v;

        }
        v = v + (parteDecimal ? ',' + parteDecimal.substring(0, 15 - parteInteira.length) : '');

    }
    document.querySelector('#display').innerText = v;

    /*
    if (sValor.length <= 3)
        document.querySelector('#display').innerText = sValor;
    else {
        if (sValor.length < 10) {
            num = parseFloat(sValor.replace(',', '.'));
            num = new Intl.NumberFormat('de-DE').format(num);
        } else {
            num = parseFloat(sValor.replace(',', '.')).toExponential(6);
        }
        document.querySelector('#display').innerText = num;
    }*/
}

const scientificNotation = (number) => {
    expoente = 0;
    if (number > 2) {
        while (number > 2) {
            number /= 10;
            expoente++;
        }
        sNum = number.toString().replace('.', ','); // continua...

    }
}

const digito = (n) => {
    if (sValor.length >= 15 && !isNewNumber) {
        return;
    }
    if (isNewNumber) {
        sValor = '' + n;
        isNewNumber = false;
    } else
        sValor += n;
    atualizaVizor();

}

// tratamento do clicque no botão de ponto decimal
const virgula = () => {
    if (isNewNumber) {
        sValor = '0,';
        isNewNumber = false;
    }
    else if (sValor.indexOf(',') == -1)
        sValor += ',';

    atualizaVizor();
}

// tratamento do botão do click no AC (all Clear)
const clearDisplay = () => {
    sValor = '0';
    oldNumber = '';
    op = ''
    isNewNumber = true;
    atualizaVizor();
}

const operation = (o) => {
    calc();
    oldNumber = sValor;
    op = o;
    isNewNumber = true;
    sValor = '';
}

const calc = () => {
    switch (op) {
        case '+':
            sValor = parseFloat(sValor.replace(',', '.')) +
                parseFloat(oldNumber.replace(',', '.')) + '';
            break;
        case '-':
            sValor = parseFloat(oldNumber.replace(',', '.')) -
                parseFloat(sValor.replace(',', '.')) + '';
            break;
        case '*':
            sValor = parseFloat(oldNumber.replace(',', '.')) *
                parseFloat(sValor.replace(',', '.')) + '';
            break;
        case '/':
            if (parseFloat(sValor.replace(',', '.')) != 0)
                sValor = parseFloat(oldNumber.replace(',', '.')) /
                    parseFloat(sValor.replace(',', '.')) + '';
            else {
                console.log("erro");
                document.querySelector('#display').innerText = "Error!";
            }
            return;
            break;
    }
    sValor = sValor.replace('.', ','); // necessário manter padrão para método atualizaVizor()

    atualizaVizor();
    // atualiza variáveis para proxima operacao
    isNewNumber = true;
    oldNumber = '';
    op = '';
    //console.log("Finalizou calculo.");
}
