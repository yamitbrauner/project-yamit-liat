import React, { Component } from 'react';
import moment from 'moment';

class ReservationRow extends Component {


  render() {
    return (<tr>
                <td>{this.props.item.reservationId}</td>
                <td>{moment(this.props.item.reservationDate).format('DD/MM/yyyy')}</td>
                <td>{moment(this.props.item.deliveryDate).format('DD/MM/yyyy')}</td>
                <td>{this.props.item.total}</td>
                <td>{this.props.item.status}</td>
    </tr>);
  }
}

export default ReservationRow;
