import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, ImageBackground } from 'react-native';
import Heading from '../assets/images/faq.jpg';
import Icon from 'react-native-vector-icons/AntDesign';
import Card from '../components/faqcard';
const Scheme = require('../assets/schemes/scheme');
import { Questions } from '../assets/data/questions';

export default class FAQ extends Component {
	render() {
		return (
			<View style={styles.mainView}>
				<ScrollView>
					<View style={{ borderBottomColor: Scheme.anchorText, borderBottomWidth: 5 }}>
						<ImageBackground source={Heading} style={styles.headerView}>
							<Text style={styles.heading}>Frequently Asked Questions</Text>
						</ImageBackground>
						<View style={styles.question}>
							<Icon name={'questioncircle'} color={'#fff'} size={50} style={{ top: 1 }} />
						</View>
					</View>
					<View style={styles.contentView}>
						<Card type={'q'} text={Questions.one.question} />
						<Card type={'a'} text={Questions.one.answer} />
						<Card type={'q'} text={Questions.two.question} />
						<Card type={'a'} text={Questions.two.answer} />
						<Card type={'q'} text={Questions.three.question} />
						<Card type={'a'} text={Questions.three.answer} />
						<Card type={'q'} text={Questions.four.question} />
						<Card type={'a'} text={Questions.four.answer} />
					</View>
				</ScrollView>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	mainView: {
		width: '100%',
		backgroundColor: Scheme.subBackground
	},

	headerView: {
		backgroundColor: '#E8E8E8',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: Dimensions.get('window').height / 5,
		resizeMode: 'cover'
	},

	heading: {
		fontSize: 20,
		color: '#fff',
		fontWeight: 'bold'
	},

	question: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: -35,
		backgroundColor: Scheme.anchorText,
		padding: 10,
		borderRadius: 40
	},

	contentView: {
		paddingTop: 20
	}
});
