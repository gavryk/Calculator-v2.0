(function(){
	let el = function(element) {
		if(element.charAt(0) === '#') {
			return document.querySelector(element);
		} else {
			return document.querySelectorAll(element);
		}
	}

	let viewer = el("#viewer"),
		equals = el("#equals"),
		nums = el(".num"),
		ops = el(".ops"),
		theNum = "",
		oldNum = "",
		resultNum,
		operator;

	let setNum = function() {
		if(resultNum) {
			theNum = this.getAttribute('data-num');
			resultNum = '';
		} else {
			theNum += this.getAttribute('data-num');
		}
		viewer.innerHTML = theNum;
	};

	let moveNum = function() {
		oldNum = theNum;
		theNum = '';

		operator = this.getAttribute('data-ops');

		equals.setAttribute('data-result', '');
	};

	let displayNum = function() {
		oldNum = parseFloat(oldNum);
		theNum = parseFloat(theNum);

		switch (operator) {
			case 'plus':
			    resultNum = oldNum + theNum;
			    break;
			case 'minus':
				    resultNum = oldNum - theNum;
				    break;
			case 'multiply':
				    resultNum = oldNum * theNum;
				    break;
			case 'devide':
			 	resultNum = oldNum / theNum;
				    break;

			default:
				resultNum = theNum;
		}

		if (!isFinite(resultNum)) {
			if (isNaN(resultNum)) {
				  resultNum = "You broke it!";
			} else {
				  resultNum = "Look at what you've done";
			}
		}

		viewer.innerHTML = resultNum;
		equals.setAttribute("data-result", resultNum);

		oldNum = 0;
		theNum = resultNum;

	};

	let clearAll = function() {
		oldNum = "";
		theNum = "";
		viewer.innerHTML = "0";
		equals.setAttribute("data-result", resultNum);
	};

	for(let i = 0; i < nums.length; i++) {
		nums[i].addEventListener('click', setNum);
	}

	for(let i = 0; i < ops.length; i++) {
		ops[i].addEventListener('click', moveNum);
	}

	equals.addEventListener('click', displayNum);

	el('#clear').addEventListener('click', clearAll);
}());