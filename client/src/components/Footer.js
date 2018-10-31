import React, { Component } from 'react'

class Footer extends Component {
    render() {
        return(
            <footer id="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 p-3 text-left">MIT License</div>
                        <div className="col-6 text-right p-3">Created by: Konstantin Brazhnik</div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer