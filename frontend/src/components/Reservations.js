import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import React, { Component } from 'react';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import ReactPaginate from 'react-paginate';
import moment from "moment";
const PER_PAGE = 5;
let MANAGER_ROLE = 1;
let isManager = false;


class Reservations extends Component {

    state = {reservations:[],reservationToShow:[], offset: 0, usersOptions:{}};


    componentDidMount(){
        isManager = this.props.userDetails.roleId === MANAGER_ROLE;
        let path = isManager ? "/reservation" : "/reservation/getById/"+ this.props.userDetails.userId;

        fetch(path)
            .then(res => res.json())
            .then(
                (resReservations) => {
                    let usersOptions = {};
                    resReservations.map((res) =>{
                        res.deliveryDate = moment(res.deliveryDate).format('DD/MM/yyyy');
                        res.reservationDate = moment(res.reservationDate).format('DD/MM/yyyy');
                        usersOptions[res.userId] = res.userId;
                    })
                    this.setState({
                        usersOptions:usersOptions,
                        reservations: resReservations,
                        reservationToShow : resReservations.slice(this.state.offset,PER_PAGE),
                        pageCount: Math.ceil(resReservations.length / PER_PAGE)
                    });
                }
            )
    }


    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * PER_PAGE);
        this.setState({ offset: offset,  reservationToShow : this.state.reservations.slice(offset, offset + PER_PAGE) });
    };

    getRowDetails=(row,tempIndex)=>{
        fetch("/getProductsByReservation?reservationId="+row.reservationId)
            .then(res => res.json())
            .then(
                (resPurchase) => {
                    let tempReservations = {... this.state.reservations};
                    tempReservations[tempIndex].items = resPurchase;
                    this.setState({reservations:tempReservations});
                },
                (error) => {
                }
            )
    }

    render() {
        let columns = [{
            dataField: 'reservationId',
            text: '#'
        },{
            dataField: 'reservationDate',
            text: 'תאריך הזמנה'
        },{
            dataField: 'deliveryDate',
            text: 'תאריך משלוח'
        }, {
            dataField: 'total',
            text: 'סה"כ לתשלום'
        }, {
            dataField: 'status',
            text: 'סטטוס'
        }];
        if(isManager) {
            columns.unshift(
                {
                    dataField: 'userId',
                    text: 'משתמש',
                    formatter: cell => this.state.usersOptions[cell],
                    filter: selectFilter({
                        options: this.state.usersOptions
                    })

                }
            )
        }
        const expandRow = {
            renderer: (row,rowIndex,props) =>{
                return (
                    <div>
                        {
                            row.items &&
                            row.items.length > 0 &&
                            <table>
                                <thead>
                                <th>שם מוצר</th>
                                <th>כמות</th>
                                <th>מחיר למוצר</th>
                                <th>סה"כ</th>
                                </thead>
                                <tbody>
                                {
                                    row.items.map(item =>{
                                        return <tr>
                                            <td>{item.prodName}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.pricePerUnit}</td>
                                            <td>{item.totalPrice}</td>
                                        </tr>

                                    })}

                                </tbody>
                            </table>
                        }
                    </div>
                )
            },
            onExpand: (row, isExpand, rowIndex, e) => {
                if(isExpand){
                    let tempIndex = rowIndex + this.state.offset;
                    if(!this.state.reservations[tempIndex].items){
                        this.getRowDetails(row,tempIndex);
                    }
                }
            },
            showExpandColumn: true,
            expandColumnPosition: 'right',
            parentClassName: 'foo',
            className: 'foo'
        };
        return (
            <div className="col">

                <BootstrapTable
                    keyField='reservationId'
                    data={ this.state.reservationToShow }
                    columns={ columns }
                    expandRow={ expandRow }
                    filter={ filterFactory() }
                />
                <ReactPaginate
                    previousLabel={'הקודם'}
                    nextLabel={'הבא'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    activeClassName={'active'}
                />
            </div>
        );
    }
}

export default Reservations;
