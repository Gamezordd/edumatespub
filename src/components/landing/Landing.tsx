import React from 'react';
import { Grid } from 'semantic-ui-react';
import pic from './assets/googleplay.png';
import app from './assets/app.png';



import personal from './assets/Ethnic friendship-rafiki.svg';
import informeddecision from './assets/Onboarding-amico.svg';
import easyprocess from './assets/Select-amico.svg';
import infosource from './assets/Setup Analytics-pana.svg'
import symbol from './assets/orangelogo.jpeg';
import insta from './assets/instagram.png';
import facebook from './assets/facebook.png';
import linkedin from './assets/linkedin.png';
import applestore from './assets/appledownload.png'
import chat from './assets/loginside2.png';
import './Landing.css'; 


export const LandingPage: React.FC<{}> = ({}) => (
	<div>
		<Grid>
				<Grid.Row centered columns='2' className='bannertop'>
				<Grid.Column width={5}>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					
					
 <Grid.Row> <p className='promo-title'> #yourOneChoice {' '}
						</p>
					</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						{' '}
						<p className='add'>
							A one stop platform to interact and engage with current students at your dream univerisities. {' '}
						</p>{' '}
					</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='play'><button><p className="buttontext">Get started today</p></button></Grid.Row>
					<Grid.Row className='hidden'>..</Grid.Row>
					<Grid.Row className='play'>
						{' '}
						<img src={pic} className='playstore' />{' '}
					
						<img src={applestore} className='appstore' />{' '}
					</Grid.Row>{' '}
					

				</Grid.Column>

				<Grid.Column width={7}>
					<Grid.Row className='Hidden'>....</Grid.Row>{' '}
					
				<Grid.Row only="mobile">
					<Grid.Row className='Hidden' only="mobile">....</Grid.Row>
				
					<Grid.Row className='Hidden' only="mobile">....</Grid.Row>
					<Grid.Row className='Hidden' only="mobile">....</Grid.Row> </Grid.Row>
					<Grid.Row>
						<img src={app} className='Appimage' />
					</Grid.Row>{' '}
					
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			
			<Grid.Row>
				{' '}
				<h1 className="title"> The New Approach </h1>
			</Grid.Row>
			<Grid.Row className='Hidden'>....</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<img src={easyprocess} className='whatwedo' />{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<img src={personal} className='whatwedo' height='100%' />
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead"> Ease of on-boarding process </h4>
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead"> Personal Relationship </h4>
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						At eduMates, with a simple 3 step tutorial, you can have access to the official representatives of your dream universities! 
Sign up now to 
experience the revolutionised way of decision making. Make #yourOnechoice today!{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						There’s nothing more comforting to know that your university cares about you and is doing its best to ensure you have the best student experience. Our aim is to make you feel valued and cared for by connecting you to students 
of the universities so that you can experience the life in the university through their lens!{' '}
					</p>{' '}
				</Grid.Column>
			
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>

			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<img src={informeddecision} className='whatwedo' />{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<img src={infosource} className='whatwedo' height='100%' />
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead"> From luck to an informed decision</h4>
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead"> Authentic sources of information </h4>
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						University can prove to be a turning part in the lives of many. No longer do you need to rely on 'luck' to achieve your 
							dreams. We help you paint your ideal life and bring you a step closer in making that a reality!{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						Decision making is a key skill wether in life or business. We help influence your decision by connecting you to the authorities in the industry. Providing official 
							sources solve your queries and making you feel a valued student at the institution.{' '}
					</p>{' '}
				</Grid.Column>
			
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>

            

			
			<Grid.Row centered columns={1} only='mobile'>
				<Grid.Column width={14}>
					<Grid.Row className='Hidden'>........</Grid.Row>
					<Grid.Row className='Hidden'>........</Grid.Row>

					<Grid.Row>
						{' '}
						<img src={easyprocess} className='whatwedo' />{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<h4 className="subhead">  Ease of on-boarding process </h4>{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<p className='descwedo'>
							{' '}
							
At eduMates, with a simple 3 step tutorial, you can have access to the official representatives of your dream universities! 
 Sign up now to 
experience the revolutionised way of decision making.Make #yourOnechoice today!{' '}
						</p>{' '}
					</Grid.Row>

					<Grid.Row className='Hidden'>........</Grid.Row>
					<Grid.Row className='Hidden'>........</Grid.Row>

					<Grid.Row>
						{' '}
						<img src={informeddecision} className='whatwedo' height='100%' />{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<h4 className="subhead"> From luck to an informed decision</h4>{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<p className='descwedo'>
							{' '}
							University can prove to be a turning part in the lives of many. No longer do you need to rely on 'luck' to achieve your 
							dreams. We help you paint your ideal life and bring you a step closer in making that a reality!

{' '}
						</p>{' '}
					</Grid.Row>

					<Grid.Row className='Hidden'>........</Grid.Row>
					<Grid.Row className='Hidden'>........</Grid.Row>

					<Grid.Row>
						{' '}
						<img src={personal} className='whatwedo' />{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<h4 className="subhead"> Personal Relationship </h4>{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<p className='descwedo'>
							{' '}
							There’s nothing more comforting to know that your university cares about you and is doing its best to ensure you have the best student experience. Our aim is to make you feel valued and cared for by connecting you to students 
of the universities so that you can experience the life in the university through their lens!     {' '}
						</p>{' '}
					</Grid.Row>
                   
					<Grid.Row className='Hidden'>........</Grid.Row>
					<Grid.Row className='Hidden'>........</Grid.Row>

					<Grid.Row>
						{' '}
						<img src={infosource} className='whatwedo' />{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<h4 className="subhead"> Authentic sources of information </h4>{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<p className='descwedo'>
							{' '}
							Decision making is a key skill wether in life or business. We help influence your decision by connecting you to the authorities in the industry. Providing official 
							sources solve your queries and making you feel a valued student at the institution.{' '}
						</p>{' '}
					</Grid.Row>



				</Grid.Column>{' '}
			</Grid.Row>

			

			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<img src={easyprocess} className='whatwedo' />{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<img src={personal} className='whatwedo' height='100%' />
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead"> Ease of on-boarding process </h4>
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead"> Personal Relationship </h4>
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						At eduMates, with a simple 3 step tutorial, you can have access to the official representatives of your dream universities! 
Sign up now to 
experience the revolutionised way of decision making. Make #yourOnechoice today!{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						There’s nothing more comforting to know that your university cares about you and is doing its best to ensure you have the best student experience. Our aim is to make you feel valued and cared for by connecting you to students 
of the universities so that you can experience the life in the university through their lens!{' '}
					</p>{' '}
				</Grid.Column>
			
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>

			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<img src={informeddecision} className='whatwedo' />{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<img src={infosource} className='whatwedo' height='100%' />
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead"> From luck to an informed decision</h4>
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<h4 className="subhead">  Authentic sources of information </h4>
				</Grid.Column>
				
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						University can prove to be a turning part in the lives of many. No longer do you need to rely on 'luck' to achieve your 
							dreams. We help you paint your ideal life and bring you a step closer in making that a reality!{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<p className='descwedo'>
						{' '}
						Decision making is a key skill wether in life or business. We help influence your decision by connecting you to the authorities in the industry. Providing official 
							sources solve your queries and making you feel a valued student at the institution.{' '}
					</p>{' '}
				</Grid.Column>
			
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>

            

			
			

			<Grid.Row>
				{' '}
				<h1 className="title"> Why choose us? </h1>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<Grid.Row className='Hidden'>................</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
					<ul>
						<li>
							<p className='list'> Discover unlimited universities</p>
						</li>
						<li>
							<p className='list'> Create a wishlist of unlimited univeristies</p>
						</li>
						<li>
							<p className='list'> Interact with the current students and edumates experts using the chat feature</p>{' '}
						</li>
						<li>
							<p className='list'> Stay up to date with your wishlisted universities</p>
						</li>

						<li>
							{' '}
							<p className='list'>We support you to make an educated decision and help you choose your one choice !</p>
						</li>
					
					</ul>
				</Grid.Column>
				<Grid.Column width={6}>
					{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
				
					<Grid.Row>
						<img src={chat} className='Phone' />
					</Grid.Row>
				</Grid.Column>{' '}
				<Grid.Column width={3} className='Hidden'>
					{' '}
					...............{' '}
				</Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet' columns={2} centered>
				<Grid.Column width={6}>
					<Grid.Row className='Hidden'>................</Grid.Row>
					
					<Grid.Row className='Hidden'>................</Grid.Row>
					<ul>
					<li>
							<p className='list'> Discover unlimited universities</p>
						</li>
						<li>
							<p className='list'> Create a wishlist of unlimited univeristies</p>
						</li>
						<li>
							<p className='list'> Interact with the current students and edumates experts using the chat feature</p>{' '}
						</li>
						<li>
							<p className='list'> Stay up to date with your wishlisted universities</p>
						</li>

						<li>
							{' '}
							<p className='list'>We support you to make an educated decision and help you choose your one choice !</p>
						</li>
						
					</ul>
				</Grid.Column>
				<Grid.Column width={6}>
					{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
				
					<Grid.Row centered>
						<img src={chat} className='Phone' />
					</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row className='Hidden' only='mobile'></Grid.Row>{' '}
			<Grid.Row className='Hidden' only='mobile'></Grid.Row>
			<Grid.Row only='mobile' columns={2} centered>
				{' '}
				<Grid.Column width={14} textAlign='center'>
					<img src={chat} className='Phone' />{' '}
				</Grid.Column>
			</Grid.Row>
			<Grid.Row only='mobile' columns={1} centered>
				{' '}
				<Grid.Column width={10}>
					<ul>
					<li>
							<p className='list'> Discover unlimited universities</p>
						</li>
						<li>
							<p className='list'> Create a wishlist of unlimited univeristies</p>
						</li>
						<li>
							<p className='list'> Interact with the current students and edumates experts using the chat feature</p>{' '}
						</li>
						<li>
							<p className='list'> Stay up to date with your wishlisted universities</p>
						</li>

						<li>
							{' '}
							<p className='list'>We support you to make an educated decision and help you choose your one choice !</p>
						</li>
					
					</ul>
				</Grid.Column>
			</Grid.Row>
			

		
			
			
			<Grid.Row className='Hidden'>....</Grid.Row>
			<Grid.Row className='bannerbottom'>
                {' '}
                <Grid.Column width={1}></Grid.Column>
                <Grid.Column width={6}>
                    <Grid.Row className='Hidden'>
                        .................{' '}
                    </Grid.Row>
                    <Grid.Row className='Hidden'>....</Grid.Row>
                    <Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
					<img src={symbol} className='symbol'/>
                    </Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row> 
					<Grid.Row>
					eduMates
					</Grid.Row>
                    <Grid.Row> <p className="endadd">
					eduMates is a platform that aims to add value in students life by providing them the personal 
					support and guidance to make an educated decision that would change the course of their life.
                    </p></Grid.Row>{' '}
                   <Grid.Row className='Hidden'>....</Grid.Row> <Grid.Row>#YourOneChoice</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
				<Grid.Row className='Hidden'>....</Grid.Row>
                    <Grid.Row> <p className="endadd">
                        Phone: </p>
                    </Grid.Row>
                   
                    <Grid.Row> <p className="endadd">
                         +91 8552003436 / 9989008038 </p>
                    </Grid.Row>
                    <Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row> <p className="endadd">Email: </p> </Grid.Row>
                    <Grid.Row> <p className="endadd">
                         contact@edumates.co </p>
                        <Grid.Row className='Hidden'>....</Grid.Row>
                        <Grid.Row className='Hidden'>....</Grid.Row>
                    </Grid.Row>
                </Grid.Column>{' '}
                <Grid.Column width={2}></Grid.Column>
                <Grid.Column width={6}>
				<Grid.Row className='Hidden'>....</Grid.Row>
				<Grid.Row className='Hidden'>....</Grid.Row> 
				<Grid.Row className='Hidden'>....</Grid.Row>
				
                    
				
			<Grid.Row > 
				     <a href="https://www.instagram.com/edumates.co/">
					<img src={insta} className='Mediaimg' />{' '} </a>
				
					{' '} <a href="https://www.linkedin.com/company/edumates/">
					<img src={linkedin} className='Mediaimg' /> </a>
				
					{' '}<a href="https://www.facebook.com/EduMates-101707294909891">
					<img src={facebook} className='Mediaimg' />  </a>
				
			</Grid.Row>
			<Grid.Row className='Hidden'>....</Grid.Row>
				<Grid.Row> <p className='endquote'> Stop hoping to get “lucky” 
				and make an informed decision. Design your ideal university life Today! </p>      </Grid.Row>
				
				<Grid.Row className='Hidden'>....</Grid.Row>
				
				<Grid.Row className='Hidden'>....</Grid.Row>
                </Grid.Column>{' '}
                <Grid.Column width={1}></Grid.Column>
            </Grid.Row>
			
		</Grid>
	</div>
);
