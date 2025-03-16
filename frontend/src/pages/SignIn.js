import React from 'react'
import Layout from '../components/layout/Layout'
import Welcome from '../components/Welcome'
import SplitScreen from '../components/SplitScreen'
import SigninForm from '../components/SigninForm'
import CtaRegister from '../components/CtaRegister'

function SignIn() {
  return (
    <Layout title={"Sign In - Laundry Cart"}>
        <SplitScreen leftWidth={1} rightWidth={1}>
            <Welcome>
                <CtaRegister/>
            </Welcome>
            <SigninForm/>            
        </SplitScreen>
    </Layout>
  )
}

export default SignIn
