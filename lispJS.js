var prompt = function(question, callback) {
    var stdin = process.stdin,
        stdout = process.stdout;

    stdin.resume();
    stdout.write(question);

    stdin.once('data', function(data) {
        callback(data.toString().trim());
    });
}

var tokenize = function(input) {
    return input.replace(/\(/g, ' ( ')
        .replace(/\)/g, ' ) ')
        .trim()
        .split(/\s+/);
};

var paranthesize = function(input, list = []) {
    var token = input.shift();
    if (token == undefined) {
        return list.pop();
    } else if (token == "(") {
        list.push(paranthesize(input, []));
        return paranthesize(input, list);
    } else if (token == ")") {
        return list;
    } else {
        return paranthesize(input, list.concat(categorize(token)));
    }
};

var categorize = function(input) {
    if (!isNaN(parseFloat(input))) {
        return { type: 'literal', value: parseFloat(input) };
    } else if (input[0] == '"' & input.slice(-1) == '"') {
        return { type: 'literal', value: input.slice(1, -1) };
    } else {
        return { type: 'symbol', value: input };
    }
};





prompt("code",
    function(input) {
        console.log(paranthesize(tokenize(input)));
        process.exit();
    });