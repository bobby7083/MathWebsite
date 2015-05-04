angular.module('mathApp', [])
    .controller('math', MathController);

MathController.$inject = ['$scope'];

function MathController($scope) {
    /* TODO:
     * Make refresh work
     */
    var currentAnswer;
    var problemType;
    $scope.answer = null;
    $scope.documentCurrentProblem = function(problem, storeAnswer, type) {
        $scope.currentProblem = problem;
        currentAnswer = storeAnswer;
        problemType = type;
    }  
    $scope.userAnswer = {
        answer: 'No Answer Yet'
    }
    $scope.showAnswer = function() {
        var correct;
        if($scope.userAnswer.answer === currentAnswer){
            correct = 'correct.';
        } else {
            correct = 'wrong .';
        }
        $scope.answer = 'The answer is ' + currentAnswer + ". You are " + correct;
    }
$scope.categories = {

    
          add:{
           name: addition(),
           types: [decimalAdd()]
       },

       sub:{
           name: subtraction(),
         types: [decimalSub()]
         },
     div: {
           name: division(),
           types: [remainder()]
       },

        mul:{
           name: multiplication(),
           types: [byEleven(), endsInFive(), fractionMul(), square(),cube()]
   }

       };
$scope.refreshProblem = function (){
    $scope.categories.add.name = addition();
    $scope.categories.add.types = [decimalAdd()];
    $scope.categories.sub.name = subtraction();
    $scope.categories.sub.types = [decimalAdd()];
    $scope.categories.div.name = division();
    $scope.categories.div.types = [remainder()];
    $scope.categories.mul.name = multiplication();
    $scope.categories.mul.types = [byEleven(), endsInFive(), fractionMul(), square(),cube()];
    
    

    };
   
      
        ////////////////////////// used for Multiplication problems
    function multiplication() {
        var num = randomNum(500, 100);
        var otherNum = randomNum(500, 10);
        return {
            name: 'Multiplication',
            answer: num * otherNum,
            questions: num + ' * ' + otherNum,
            strategy: 'um, just be good at math, lots of ways'
        };
    }

    function byEleven() {
        var num = randomNum(100000, 1000);
        var answer = num * 11
        return {
            name: 'By Eleven',
            answer: answer.toString(),
            questions: num + ' * 11',
            strategy:'do a fibo sequance, n + (n+1)'
        };
    }

    function endsInFive() {
        var num = toFive(randomNum(1000, 10));
        var otherNum = toFive(randomNum(1000, 10));
        var answer = num * otherNum;
        function toFive(number) {
            return +number.toString().replace(/\d$/, '5');
        }
        return {
            name: 'Ends in Five',
            answer: answer.toString(),
            questions: num + ' * ' + otherNum,
            strategy: 'idk'
        };
    }

    function fractionMul() {
        var randomFrac = randomFraction();
        return {
            name: 'fraction',
            answer: randomFrac.answer.toString(),
            questions: randomFrac.questions,
            strategy: 'ask in person'
        };
    }

    function square() {
        var num = randomNum(30, 10);
        return {
            name: 'Squares',
            answer: Math.pow(num, 2).toString(),
            questions: num + ' ^  2',
            strategy: 'LEARN YOUR SQUARES'
        };
    }

    function cube() {
            var num = randomNum(20, 3);
            return {
                name: 'Cubes',
                answer: Math.pow(num, 3).toString(),
                questions: num + ' ^ 3',
                strategy: 'see squares' 
            };
        }
        //////////////////////////////////  used for Division problems
    function division() {
        var num = randomNum(50, 5);
        var otherNum = randomNum(30, 5);
        var temp = num * otherNum; // insures whole number answer
        return {
            name: 'Division',
            answer: num.toString(),
            questions: temp + '/' + otherNum,
            strategy:'pass 3rd grade'
        };
    }

    function remainder() {
            var num = randomNum(3000, 100);
            var otherNum = randomNum(15, 3)
            var answer = num % otherNum;
            return {
                name: 'Remainder',
                answer: answer.toString(),
                questions: num + '/' + otherNum + ' remainder',
                strategy:'to lazy at the moment'
            };
        }
        //////////////////////////// used for Addition problems
    function addition() {
        var num = randomNum(10000, 100);
        var otherNum = randomNum(10000, 100);
        var answer = num + otherNum;
        return {
            name: 'Addition',
            answer: answer.toString(),
            questions: num + ' + ' + otherNum,
            strategy:'pass first grade'
        };
    }

    function decimalAdd() {
        var num = decimalNum();
        var otherNum = decimalNum();
        var answer = num + otherNum
        return {
            name: 'Decimal',
            answer: answer.toFixed(2),
            questions: num.toFixed(2) + ' + ' + otherNum.toFixed(2),
            strategy:'move decimal place, if it helps'
        };
    }
        ////////////////////////////////////////// used for Subtraction problems
    function subtraction() {
        var num = randomNum(10000, 100);
        var otherNum = randomNum(10000, 100);
        var answer = num - otherNum;
        return {
            name: 'Subtraction',
            answer: answer.toString(),
            questions: num + ' - ' + otherNum,
             strategy:'pass first grade'
        };
    }

    function decimalSub() {
        var num = decimalNum();
        var otherNum = decimalNum();
        var answer = num - otherNum;
        return {
            name: 'Decimal',
            answer: answer.toFixed(2),
            questions: num.toFixed(2) + ' - ' + otherNum.toFixed(2),
            strategy: 'see adding decimals, to tired at the moment'
        };
    }

/////////////////////////////////////////////////////////////////////// things get weird 
        function randomFraction() { // really odd, but it has to return a very very very specific type of fraction 
            var wholeNum = randomNum(30, 5);
            var denominator = randomNum(wholeNum + 3, wholeNum - 3);
            var question = wholeNum + ' * ' + wholeNum + '/' +
                denominator;
            var answer;

            function answer() { // solves problem, but keeps it as a fraction, dont try to understand, its not using logical math, just a pattern. however it works nicely 
                var diffBetweenNumAndDen = wholeNum -
                    denominator;
                var numirator = diffBetweenNumAndDen *
                    diffBetweenNumAndDen;
                wholeNum = wholeNum + diffBetweenNumAndDen;
                if (numirator >= denominator) {
                    for (var foo = numirator; foo >=
                        denominator; foo -= denominator) {
                        wholeNum++;
                        numirator -= denominator;
                    }
                }
                simplify();

                function simplify() { // simplifies fraction before its made into a string
                    for (var x = 2; x < denominator; x++) {
                        if (numirator % x === 0 &&
                            denominator % x === 0) {
                            numirator = numirator / x;
                            denominator = denominator / x;
                            simplify();
                        }
                    }
                }
                answer = wholeNum + ' ' + numirator + '/' +
                    denominator;
            }
            answer();

            return {
                answer: answer,
                questions: question,
            };
        }

 /////////////////////////////////////////////////////////// gets random numbers
    function decimalNum() {
        var num = Math.random() * (2000 - 10) + 1; 
        return num;
    }

    function randomNum(max, min) {
        var num = Math.floor((Math.random() * (max - min)) + min);
        return num;
    }
/////////////////////////////////////////////////////////// need help button
$scope.needHelp = function(){
    $scope.strategy = problemType.strategy;
    
}

}