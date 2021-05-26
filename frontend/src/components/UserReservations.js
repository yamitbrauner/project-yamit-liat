import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import moment from "moment";

class UserReservations extends Component {

    render() {
       let columns = [
           {
               dataField: 'reservation.reservationId',
               text: '#',
               classes: 'small-col',
               headerClasses:'small-col',
           },{
               dataField: 'reservation.reservationDate',
               text: 'תאריך הזמנה',
               formatter: (cell, row, rowIndex, formatExtraData) => {
                   return row.reservation.reservationDate ? (moment(row.reservation.reservationDate).format('DD/MM/yyyy')): "";
               }
           },{
               dataField: 'reservation.deliveryDate',
               text: 'תאריך משלוח',
               formatter: (cell, row, rowIndex, formatExtraData) => {
                   return row.reservation.deliveryDate ? (moment(row.reservation.deliveryDate).format('DD/MM/yyyy')) : "";
               }
           }, {
               dataField: 'reservation.total',
               text: 'סה"כ לתשלום',
               formatter: (cell, row, rowIndex, formatExtraData) => {
                   return "₪" + row.reservation.total;
               }
           }, {
               dataField: 'reservation.status',
               text: 'סטטוס'
           }];
         const expandRow = {
            renderer: (row,rowIndex,props) =>{
                return <ul>
                    {row.productIterable.map(item=>{
                        return <li className="list-style">
                            {item.quantity + " x " +item.prodName +" (₪" + item.pricePerUnit+") - ₪" + item.totalPrice}
                        </li>})}

             </ul>
            },
            showExpandColumn: true,
             expandColumnPosition: 'right'
        };
        return (
                <BootstrapTable
                    keyField='reservation.reservationId'
                    data={ this.props.details }
                    columns={ columns }
                    expandRow = {expandRow}
                />
        );
    }
}

export default UserReservations;
