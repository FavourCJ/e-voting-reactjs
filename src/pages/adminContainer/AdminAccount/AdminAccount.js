import React from 'react'
import Footer from '../../../component/footer/Footer'
import Header from '../../../component/header/Header'
import MyAccount from '../../../component/myAccount/MyAccount'

function AdminAccount() {
  return (
    <div>
      <Header/>
        <MyAccount/>
        <div className='account-footer'>
       <Footer/>
    </div>
    </div>
  )
}

export default AdminAccount