import Inbox from './Inbox'

function LeftMenu(props){

    return (
        <nav className="left-menu">
            <ul className="inbox-list">
            
            <Inbox currentTab = {props.currentTab} setCurrentTab = {props.setCurrentTab} unreadEmails = {props.unreadEmails}/>

            <Starred currentTab = {props.currentTab} setCurrentTab = {props.setCurrentTab} starredEmails = {props.starredEmails}/>

            <HideRead hideRead = {props.hideRead} setHideRead = {props.setHideRead}/>
            
            </ul>
        </nav>
    )
}

export default LeftMenu