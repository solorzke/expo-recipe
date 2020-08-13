/* 
API Class that can be reused to test or request data from the API in service.
API: 'spoonacular'
HTTP Request Package: 'fetch' 

Required: 'API KEY' and <ingredients>
1. request: search recipe id's by ingredients
2. request: search recipe info by recipe id's
*/
export default class API {
	constructor(items) {
		var _API = require('../../api/token');
		this.getAPIKey = () => {
			return _API.key;
		};
		this.items = items;
	}

	async requestHTTP(callback) {
		const jsonContent = require('./bulk.json');
		let data = [];
		for (let item in jsonContent) {
			data.push({
				label: jsonContent[item]['title'],
				image: jsonContent[item]['image'],
				source: this.returnSourceName(jsonContent[item]['sourceName']),
				url: jsonContent[item]['sourceUrl'],
				dietLabels: jsonContent[item]['diets'],
				healthLabels: this.returnHealthLabels(jsonContent[item]),
				ingredientLines: this.returnIngredientsList(jsonContent[item]['extendedIngredients']),
				totalTime: jsonContent[item]['readyInMinutes'],
				summary: jsonContent[item]['summary'],
				instructions: this.returnInstructions(jsonContent[item]['analyzedInstructions']),
				ww: this.returnWeightWatchersRating(jsonContent[item])
			});
		}

		if (typeof callback === 'function') {
			callback(data);
		}
	}

	returnIngredientsList = (payload) => {
		let data = [];
		if (payload != null) {
			for (let ingredient of payload) {
				data.push(ingredient['original']);
			}
		} else {
			data.push('Not available');
		}

		return data;
	};

	returnWeightWatchersRating = (payload) => {
		return payload['weightWatcherSmartPoints'] != null ? payload['weightWatcherSmartPoints'] : 0;
	};

	returnSourceName = (payload) => {
		return payload != null ? payload : 'Spoonacular';
	};

	returnHealthLabels = (payload) => {
		let data = [];
		payload['vegetarian'] == true ? data.push('vegetarian') : null;
		payload['vegan'] == true ? data.push('vegan') : null;
		payload['glutenFree'] == true ? data.push('gluten free') : null;
		payload['dairyFree'] == true ? data.push('dairy free') : null;
		payload['sustainable'] == true ? data.push('sustainable') : null;
		data.push('weight watcher smart points: ' + payload['weightWatcherSmartPoints']);
		return data;
	};

	returnInstructions = (steps) => {
		let data = [];
		if (steps != null) {
			for (let i = 0; i < steps.length; i++) {
				if (steps[i].hasOwnProperty('steps')) {
					const label = steps[i]['name'] != '' ? steps[i]['name'] : 'Instruction:';
					data[i] = [ { name: label } ];
					for (let instruction of steps[i]['steps']) {
						if (instruction.hasOwnProperty('step') && instruction.hasOwnProperty('number')) {
							data[i].push({
								number: instruction['number'],
								instruction: instruction['step']
							});
						}
					}
				}
			}
		} else {
			data.push(false);
		}

		if (data.length == 0 || data == null) {
			data = [ false ];
			return data;
		} else {
			return data;
		}
	};

	returnIngredients = () => {
		return 'ingredients=' + this.items.join();
	};

	returnAuth = () => {
		return 'apiKey=' + this.getAPIKey();
	};

	returnIngredientsURL = () => {
		return 'https://api.spoonacular.com/recipes/findByIngredients?';
	};

	returnRecipeInfoURL = () => {
		return 'https://api.spoonacular.com/recipes/informationBulk?';
	};
}
