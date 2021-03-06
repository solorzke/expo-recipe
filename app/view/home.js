import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import HeadBar from '../components/head';
import Status from '../components/statusbar';
import Card from '../components/card';
import Animation1 from '../assets/animations/food-carousel.json';
import Animation2 from '../assets/animations/noodles.json';
import Animation3 from '../assets/animations/search-ask.json';
import API from '../api/index';
const Scheme = require('../assets/schemes/scheme');

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			payload: [ { label: 'Please Wait...' } ],
			refreshing: false
		};
	}

	/* Change the style for the card components */
	returnStyle = (color) => {
		return {
			width: '100%',
			height: 200,
			justifyContent: 'center',
			alignItems: 'center',
			borderTopLeftRadius: 10,
			borderTopRightRadius: 10,
			backgroundColor: color
		};
	};

	componentDidMount() {
		this.transmitRequest();
	}

	/* Request a random recipe from Spoonacular */
	transmitRequest = () => {
		this.setRefreshState();
		const api = new API();
		api.requestRandomRecipe((data) => {
			if (data) this.setRandomRecipeState(data);
			this.setRefreshState();
		});
	};

	/* Toggle the refresh state for when you refresh the page with RefreshControl */
	setRefreshState = () => {
		const refreshState = this.state.refreshing;
		this.setState({
			refreshing: !refreshState
		});
	};

	/* Set the random recipe state  */
	setRandomRecipeState = (data) => {
		this.setState({
			payload: data
		});
	};

	setSubtitle = () => {
		const payload = this.state.payload[0];
		return !payload.hasOwnProperty('label')
			? 'Please Wait...'
			: payload['label'] !== undefined ? payload['label'] : 'Spoonacular Random Recipe';
	};

	/* Gate-Keep the user from entering the random recipe page if the recipe data wasn't yet received. */
	didRecipeDataArrive = () => {
		const payload = this.state.payload;
		if (payload[0]['label'] === 'Please Wait...') return alert('Please wait while we retrieve the recipe.');
		return this.props.navigation.navigate('Recipe', { food: payload[0] });
	};

	render() {
		return (
			<View style={styles.mainView}>
				<Status barStyle={'light-content'} />
				<HeadBar name={'Home'} onPress={() => this.props.navigation.toggleDrawer()} />
				<ScrollView
					style={styles.buttonView}
					// refreshControl={
					// 	<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.transmitRequest()} />
					// }
				>
					<Card
						onPress={() => this.props.navigation.navigate('Search By')}
						title={'Start Finding Recipes'}
						subtitle={'Fill in available ingredients to generate recipes'}
						background={this.returnStyle(Scheme.labelText)}
						animation={Animation1}
					/>
					<Card
						onPress={() => this.didRecipeDataArrive()}
						title={'Recipe Of The Day'}
						subtitle={this.setSubtitle()}
						background={this.returnStyle(Scheme.anchorText)}
						animation={Animation2}
					/>
					<Card
						onPress={() => this.props.navigation.navigate('FAQ')}
						title={'Frequently Asked Questions'}
						subtitle={'Have questions? Check out our FAQ section'}
						background={this.returnStyle('#F1BF98')}
						animation={Animation3}
					/>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		flex: 1,
		width: '100%',
		backgroundColor: Scheme.subBackground
	},

	buttonView: {
		flex: 2,
		paddingHorizontal: 10
	},

	button: {
		justifyContent: 'center',
		alignItems: 'center'
	}
});
