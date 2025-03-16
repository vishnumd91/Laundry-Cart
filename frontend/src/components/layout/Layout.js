import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from 'react-helmet';
import {Toaster} from 'react-hot-toast';

function Layout( { children, title, description, keywords, author } ) {
  return (
    <>
        <Helmet>
          <meta charSet='UTF-8' />
          <meta name='description' content={description}/>
          <meta name='keywords' content={keywords}/>
          <meta name='author' content={author}/>
          <title>{title}</title>
        </Helmet>
        <Header/>
          <main>
            <Toaster />
            {children}
          </main>
        <Footer/>
    </>
  )
}

Layout.defaultProps = {
  title : "Laundry Cart",
  description : "Laundry Cart app MERN stack project",
  keywords : "mern, react, node, mongodb",
  author : "Sonali Malage"
}

export default Layout
