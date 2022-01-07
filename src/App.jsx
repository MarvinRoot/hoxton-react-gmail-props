import { useState } from 'react'

import initialEmails from './data/emails'

import './App.css'
import Header from './components/Header'
import LeftMenu from './components/LeftMenu/LeftMenu'
import EmailsList from './components/Emails/EmailsList'

const getReadEmails = emails => emails.filter(email => !email.read)

const getStarredEmails = emails => emails.filter(email => email.starred)

const getSearchedEmails = (emails, search) => emails.filter(email => email.title.toUpperCase().includes(search.toUpperCase())
|| email.sender.toUpperCase().includes(search.toUpperCase()))

function App() {
  const [emails, setEmails] = useState(initialEmails)
  const [hideRead, setHideRead] = useState(false)
  const [currentTab, setCurrentTab] = useState('inbox')
  const [searchInput, setSearchInput] = useState('')

  const unreadEmails = emails.filter(email => !email.read)
  const starredEmails = emails.filter(email => email.starred)

  const toggleStar = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id
          ? { ...email, starred: !email.starred }
          : email
      )
    setEmails(updatedEmails)
  }

  const toggleRead = targetEmail => {
    const updatedEmails = emails =>
      emails.map(email =>
        email.id === targetEmail.id ? { ...email, read: !email.read } : email
      )
    setEmails(updatedEmails)
  }

  let filteredEmails = emails

  if (hideRead) filteredEmails = getReadEmails(filteredEmails)

  if (currentTab === 'starred')
    filteredEmails = getStarredEmails(filteredEmails)

  if (searchInput !== '')
    filteredEmails = getSearchedEmails(filteredEmails, searchInput)

  return (
    <div className="app">
      
      <Header searchInput = {searchInput} 
      setSearchInput = {setSearchInput} 
      filteredEmails = {filteredEmails} 
      getSearchedEmails = {getSearchedEmails}/>
      
      <LeftMenu currentTab = {currentTab} 
      setCurrentTab = {setCurrentTab} 
      unreadEmails={unreadEmails} 
      starredEmails = {starredEmails}
      hideRead = {hideRead} 
      setHideRead = {setHideRead}
      />

      <EmailsList filteredEmails = {filteredEmails}
       toggleRead = {toggleRead} 
       toggleStar = {toggleStar} />

    </div>
  )
}

export default App
