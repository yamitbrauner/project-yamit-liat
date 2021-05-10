import React, { Component } from 'react';
import moment from 'moment';

class ReservationRow extends Component {


  render() {
    return (
        <>
            <tr>
                <td>{this.props.item.reservationId}</td>
                <td>{moment(this.props.item.reservationDate).format('DD/MM/yyyy')}</td>
                <td>{moment(this.props.item.deliveryDate).format('DD/MM/yyyy')}</td>
                <td>{this.props.item.total}</td>
                <td>{this.props.item.status}</td>
                <td onClick={()=>this.extraInfo}>פרטי ההזמנה</td>
            </tr>
            {/*<tr>*/}
            {/*    <table>*/}
            {/*    <tr>*/}
            {/*        <th scope="col">#</th>*/}
            {/*        <th scope="col">תאריך הזמנה</th>*/}
            {/*        <th scope="col">תאריך משלוח</th>*/}
            {/*        <th scope="col">סה"כ לתשלום</th>*/}
            {/*        <th scope="col">סטטוס</th>*/}
            {/*        <th scope="col"/>*/}
            {/*    </tr>*/}
            {/*    <tr data-toggle="collapse"*/}
            {/*        data-target=".multi-collapse1"*/}
            {/*        aria-controls="multiCollapseExample1">*/}
            {/*        <td>{this.props.item.reservationId}</td>*/}
            {/*        <td>{moment(this.props.item.reservationDate).format('DD/MM/yyyy')}</td>*/}
            {/*        <td>{moment(this.props.item.deliveryDate).format('DD/MM/yyyy')}</td>*/}
            {/*        <td>{this.props.item.total}</td>*/}
            {/*        <td>{this.props.item.status}</td>*/}
            {/*        <td onClick={()=>this.extraInfo}>מידע נוסף</td>*/}
            {/*    </tr>*/}
            {/*    </table>*/}

            {/*</tr>*/}
        </>
    );
  }
}

export default ReservationRow;
