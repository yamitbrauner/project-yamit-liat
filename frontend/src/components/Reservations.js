import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import React, { Component } from 'react';
import ReservationRow from "./ReservationRow";
import ReactPaginate from 'react-paginate';
const PER_PAGE = 5;


class Reservations extends Component {

    state = {reservations:[],reservationToShow:[], offset: 0};


    componentDidMount(){
        fetch("/reservation/getById/"+ this.props.userDetails.userId)
            .then(res => res.json())
            .then(
                (resReservations) => {
                    this.setState({
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

    getRowDetails=(row)=>{
        debugger;
        fetch("/getProductsByReservation?reservationId="+row.reservationId)
            .then(res => res.json())
            .then(
                (resPurchase) => {
                    debugger;
                },
                (error) => {
                }
            )
    }

    render() {
        const columns = [{
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
        const expandRow = {
            renderer: row => (
                <div>
                    <p>{ `This Expand row is belong to rowKey ${row.id}` }</p>
                    <p>You can render anything here, also you can add additional data on every row object</p>
                    <p>expandRow.renderer callback will pass the origin row object to you</p>
                </div>
            ),
            onExpand: (row, isExpand, rowIndex, e) => {
                if(isExpand){
                    this.getRowDetails(row);
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
