import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return(
            <footer id="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">MIT License</div>
                        <div className="col-6 text-right">Created by: Konstantin Brazhnik</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer