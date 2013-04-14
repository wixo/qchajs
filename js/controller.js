'use strict';

var QCH = {
	state : null
}

// Controllers

function KeywordListCtrl( $scope, $http ) {

	var buildKeywordInside;

	buildKeywordInside = function ( givens ) {
	// Will build the Keyword Section with its definitios and examples
		var keywordInside
		  , name
		  , definitionsContainer
		  ;

		name = $h2.attr({ 'class' : 'keywordName' }).text( givens.name );
		definitionsContainer = $div.attr({ 'class' : 'keywordDefinitions' }).text( givens.definition );

		// Definitions!
		givens.definitions.forEach( function ( element, index ) {
			var definitionContainer
			  , examples
			  , title
			  ;

			definitionContainer = $div.attr({ 'class' : 'keywordDefintionContainer' });
			$p.attr({ 'class' : 'keywordDefinition' }).text( element.content ).appendTo( definitionContainer );

			// Examples!
			examples = !!givens.definitions[index].examples[1] 
			? $ul.attr({ 'class' : 'keywordExamples' }) 
			: givens.definitions[index].examples[0] && $span.attr({ 'class' : 'keywordExample' }).text( givens.definitions[index].examples[0].content  );

			!!givens.definitions[index].examples[1] && givens.definitions[index].examples.forEach( function ( exampleElement, exampleIndex ) {
				$li.attr({ 'class' : 'keywordExample' }).text( givens.definitions[index].examples[exampleIndex].content ).appendTo( examples );
			} );

			givens.definitions[index].examples[0] && examples.appendTo( definitionContainer );
			definitionContainer.appendTo( definitionsContainer );
		} );

		keywordInside = $div.attr({ 'class' : 'keywordInside' }).append( name ).append( definitionsContainer );

		return keywordInside;
	}

	$http.get( '/data/words.json' ).success( function ( data ) {
		$scope.keywords = data;
	} );

	$scope.orderProp = 'id';

	$scope.showKeywordInside = function ( ev ) {
		var $this       = $( ev.srcElement )
		  , $definition = $('div.definition')
		  , $keywords   = $('ul.keywords')
		  ;

		$definition.append( buildKeywordInside( $scope.keywords[ parseInt( $this.parent().data('id') - 1, 10 ) ] ) ) ;
		$keywords.slideUp( function () {
			$definition.slideDown();
		} );

		QCH.state = 'keywordsInside';

	}

	$scope.showKeywords = function () {
		// Please Fix the DOM interactions
		var $definition = $('div.definition')
		  , $keywords   = $('ul.keywords')
		  ;

		if ( QCH.state === 'keywordsInside' ) {
			$definition.slideUp( function () {
				$keywords.slideDown();
			} ).empty();
			QCH.state = 'keywords';
		}
	}

}
