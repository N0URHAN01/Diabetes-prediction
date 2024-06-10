import React from 'react'
import user_image from "../Assets/ur.png";
import ChooseMeals from "../Assets/choose-image.png";
import DeliveryMeals from "../Assets/ff.png";

function Work() {
    const workInfoData = [
        {
          image: user_image,
          title: "create a new account",
          text: "you must fill the signup form to create a new account then you can login using the data you filled, now you can use our site.",
        },
        {
          image: ChooseMeals,
          title: "Home Page",
          text: "when you loged in successful you will be in the home page and now you can click (Enter your data for predicting) button to go to the predicting form and start fill your inforamtion. ",
        },
        {
          image: DeliveryMeals,
          title: "predicting & recommended",
          text: "after you fill  inforation in form the predict  based on your information  you filled will show  the result in a samll window  display to you if you have a diabetes  or no and when click in recommend it will download a file have a recommend data for you   .",
        },
      ];
  return (
    <div className='work-section-wrapper' id='how-it-works-section'>
        <div className='work-section-top'>
            <p className='primary-subheading'>Work</p>
            <h1 className='primary-heading'>How It Work</h1>
            <p className='primary-text'>
            we understand the importance of usability service. Our friendly website is here to ensure you have a good experience from start to finish.
            </p>
        </div>
        <div className='work-section-bottom'>
            {workInfoData.map((data)=>(
                <div className='work-section-info' key={data.title}>
                    <div className='info-boxes-img-container'>
                        <img src={data.image} alt=''/>
                    </div>
                    <h2>{data.title}</h2>
                    <p>{data.text}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Work