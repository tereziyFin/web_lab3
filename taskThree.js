let btnCreateTable = document.querySelector('#create_table');
let btnAddStr = document.querySelector('#add_str');
let btnRemStr = document.querySelector('#rem_str');
let inputStr = document.querySelector('#input_str');

const columnsCount = 5;
let id = 0;
let tableContent = null;

btnCreateTable.addEventListener('click', createTable);


function createTable() {
	if(tableContent == null) {
		tableContent = document.createElement('table');
		tableContent.classList.add('table_content');

		let tableHead = document.createElement('thead');
		let rowHeads = document.createElement('tr');

		let headId = document.createElement('td');
		headId.textContent = 'ID';
        rowHeads.append(headId);

        if (columnsCount === 2){
            let headContent = document.createElement('td');
		    headContent.textContent = 'Content';
            rowHeads.append(headContent);
        } else{
            for (let i = 1; i < columnsCount; i++){
		        let headContent = document.createElement('td');
		        headContent.textContent = 'Content' + ' ' + i;
                rowHeads.append(headContent);
            }
        }

		tableHead.append(rowHeads);
        tableContent.append(tableHead);

		tableBody = document.createElement('tbody');
        tableContent.append(tableBody);

		document.querySelector('#main_content').append(tableContent);

        btnAddStr.addEventListener('click', addRow);
        btnRemStr.addEventListener('click', removeRow);

		btnAddStr.removeAttribute("disabled");
	    btnRemStr.removeAttribute("disabled");
	    inputStr.removeAttribute("disabled");
	}
	else {
		alert("Таблица уже создана!");
	}
}

function addRow(){
    let arr = [];
    id++;
    for (let i = 1 ; i <= columnsCount; i++)
        arr.push(i + ' ' + id);
	tableBody.append(createRow(id, arr));
}

function createRow(id, arr){
	let tr = document.createElement('tr');
	tr.id = id;

	for(let i = 0; i < columnsCount; i++){
		let td = document.createElement('td');
		td.classList.add("td");
		tr.append(td);
	}

	containRow(tr, arr);
	return tr;
}

function containRow(tr, arr){
	let arrayTd = tr.querySelectorAll('.td');
	if(arrayTd.length === columnsCount) {
        arrayTd[0].textContent = tr.id;
		for (let i = 1; i < columnsCount; i++) {
			arrayTd[i].textContent = arr[i - 1];
		}
	}

}

function removeRow() {
	let children = tableBody.childNodes;
	const parsed = +inputStr.value - 1;
	if(parsed < children.length && parsed >= 0) {
		children[parsed].remove();
		inputStr.value = '';
	}
	recalculateId(parsed);
}

function recalculateId(count){
    id--;
    let children = tableBody.childNodes;
    for (i = count; i < children.length; i++){
        children[i].id = children[i].id - 1;
        children[i].querySelector('.td').textContent = children[i].id;
    }
}

