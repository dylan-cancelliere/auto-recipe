import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
		maxHeight: 690,
		margin: 'auto',
	},
});

export default function ImgMediaCard(props) {
	const classes = useStyles();
	const { image, title, link } = props;
	let { time } = props;
	if (time === 0) time = 'N/A';
	else time = `${time} minutes`;

	return (
		<div style={{ paddingBottom: '15px' }}>
			<Card className={classes.root}>
				<CardActionArea href={link}>
					<CardMedia
						component='img'
						height='140'
						image={image}
						title='Contemplative Reptile'
					/>
					<CardContent>
						<Typography gutterBottom variant='h5' component='h2'>
							{title}
						</Typography>
						<Typography
							variant='body2'
							color='textSecondary'
							component='p'>
							Cook time: {time}
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</div>
	);
}
