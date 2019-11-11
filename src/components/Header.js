import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

class Header extends React.Component {
    render() {

        const loginButton = (
            <li>
                    <Link to = "/login">
                        <i className="material-icons">vpn_key</i>
                    </Link>
            </li>
        );

        const logoutButton = (
            <li>
                <a onClick={this.props.onLogout}>
                    <i className="material-icons">lock_open</i>
                </a>
            </li>
        );


        return (
            <nav>
                <div className="nav-wrapper black darken-1">
                    {/* <a className="brand-logo center">MEMOPAD</a> */}
                    <Link to="/" className="brand-logo center">OAZ</Link>

                    <ul>
                        <li><a><i className="material-icons">search</i></a></li>
                        {/* <li><i className="material-icons">dropdown</i></li>  드롭다운 메뉴 추가 예정*/}
                    </ul>

                    <div className="right">
                        <ul>
                            { this.props.isLoggedIn ? logoutButton : loginButton }
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

// propTypes 설정은 자유!

Header.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLogout: PropTypes.func
};

Header.defaultProps = {
    isLoggedIn: false,
    onLogout: () => { console.error("logout function not defined");}
};


export default Header;