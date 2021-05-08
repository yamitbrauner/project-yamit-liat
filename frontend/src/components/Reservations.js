import React, { Component } from 'react';
import ReservationRow from "./ReservationRow";
import ReactPaginate from 'react-paginate';
const PER_PAGE = 5;

class Reservations extends Component {

    state = {items:[],reservationToShow:[], offset: 0};


    componentDidMount(){
        fetch("/reservation/getById/"+ this.props.userDetails.userId)
            .then(res => res.json())
            .then(
                (resReservations) => {
                    this.setState({
                        items: resReservations,
                        reservationToShow : resReservations.slice(this.state.offset,PER_PAGE),
                        pageCount: Math.ceil(resReservations.length / PER_PAGE)
                    });
                }
            )
    }


    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * PER_PAGE);
        this.setState({ offset: offset,  reservationToShow : this.state.items.slice(offset, offset + PER_PAGE) });
    };



    render() {
        return (
            <div className="col">
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">תאריך הזמנה</th>
                        <th scope="col">תאריך משלוח</th>
                        <th scope="col">סה"כ לתשלום</th>
                        <th scope="col">סטטוס</th>

                    </tr>
                    </thead>
                    <tbody>
                    {this.state.reservationToShow.length > 0 && this.state.reservationToShow.map((item,index)=>{
                        return <ReservationRow item={item} key={index} index={index}/>
                    })}
                    </tbody>
                </table>
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
