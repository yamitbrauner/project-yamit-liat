import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory, { selectFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import UserReservations from "./UserReservations";

import moment from "moment";
const PER_PAGE = 5;
let MANAGER_ROLE = 1;
let isManager = false;


class Users extends Component {

    state = {data:[], offset: 0, viewDetails: false, detailsIndex: false};


    componentDidMount(){
        isManager = this.props.userDetails.roleId === MANAGER_ROLE;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        let path = isManager ? "/admin/allUsersFullReservation" : "/reservation/fullUserReservation/"+ this.props.userDetails.userId;
        fetch(path, requestOptions)
            .then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        data: res,
                        viewDetails: !isManager
                    });
                }
            )
            .catch((error)=>{
            this.props.showPopup(4);
            })
    }


    handlePageChange = (page,sizePerPage) => {
        let offset = Math.ceil((page-1) * sizePerPage);
        this.setState({ offset: offset});
    };

    viewReservations=(index)=>{
        let tempIndex = index + this.state.offset;
        this.setState({viewDetails: true, detailsIndex: tempIndex})
    }

    render() {
        const paginationOption = paginationFactory({
            sizePerPage: PER_PAGE,
            hideSizePerPage:  true,
            withFirstAndLast:true,
            onPageChange: this.handlePageChange

        });
        let columns = [{
            dataField: 'userDetails.firstName',
            text: 'שם',
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                    row.userDetails.firstName + " " + row.userDetails.lastName
                );
            },
        },{
            dataField: 'userDetails.address',
            text: 'כתובת'
        }, {
            dataField: 'userDetails.phone',
            text: 'טלפון'
        }, {
            dataField: 'orders',
            text: 'כמות הזמנות',
            formatter: (cell,row,rowIndex,formatExtraData)=>{
                return row.userCart.length;
            }
        }, {

            dataField: 'edit',
            isDummyField: true,
            text: '',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if(row.userCart.length>0){
                        this.viewReservations(rowIndex);
                    }

                },
            },
            classes: 'small-col',
            headerClasses:'small-col',
            formatter: (cell, row, rowIndex, formatExtraData) => {
                return (
                row.userCart.length > 0 ?
                    <div className="col">
                        <span className="glyphicon glyphicon-plus-sign"/>
                    </div> : ""
                );
            },
        }
        ];
        let details ={};

        if(this.state.data.length>0){
            if(isManager){
                details = this.state.detailsIndex ? this.state.data[this.state.detailsIndex].userCart : {};
            }else {
                details= this.state.data;
            }
        }

        return (
            <div className="col">
                {this.state.data.length>0 ?
                    this.state.viewDetails === false ?
                        <BootstrapTable
                            pagination={paginationOption}
                            keyField='rowIndex'
                            data={ this.state.data }
                            columns={ columns }
                            filter={ filterFactory() }
                        />
                        :
                        <div>
                            <div className="margin-top-bottom">
                                {isManager ? <button className="btn btn-danger" onClick={()=>{this.setState({viewDetails: false, detailsIndex: false})}}>חזרה לטבלת המשתמשים</button> : ""}
                            </div>
                            <UserReservations details={details}/>
                        </div>
                    : ""
                }
            </div>
        );
    }
}

export default Users;
