import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-filter/dist/react-bootstrap-table2-filter.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import UserReservations from "./UserReservations";
import { getHeaders } from './GlobalFunc'

let isManager = false;


class Users extends Component {

    state = {data:[], offset: 0, viewDetails: false, resDetails: ''};


    componentDidMount(){
        isManager = this.props.userDetails.roleId === window.MANAGER_ROLE;
        var requestOptions = {
            method: 'GET',
            redirect: 'follow',
            headers: getHeaders()
        };
        let path = isManager ? "/admin/allUsersFullReservation" : "/user/"+ this.props.userDetails.userId+"/getFullUserReservation";
        fetch(path, requestOptions)
            .then(res => res.json())
            .then(
                (res) => {
                    let tempData = [...res];
                    if(isManager){
                        tempData.forEach((obj,index) => {
                            tempData[index]["userDetails"].numOfOrders = obj.userCart.length;
                        })
                    }
                   this.setState({
                        data: tempData,
                        viewDetails: !isManager
                    });
                }
            )
            .catch((error)=>{
                this.props.showPopup(window.ERROR_POPUP);
            })
    }


    handlePageChange = (page,sizePerPage) => {
        let offset = Math.ceil((page-1) * sizePerPage);
        this.setState({ offset: offset});
    };

    viewReservations=(details)=>{
        this.setState({viewDetails: true, resDetails: details})
    }

    render() {
        const defaultSorted = [{
            dataField: 'userDetails.numOfOrders', // if dataField is not match to any column you defined, it will be ignored.
            order: 'asc' // desc or asc
        }];
        const paginationOption = paginationFactory({
            sizePerPage: window.PER_PAGE,
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
            dataField: 'userDetails.numOfOrders',
            text: 'כמות הזמנות',
            sort: true,
            sortFunc: (a, b, order, dataField, rowA, rowB) => {
                if (order === 'asc') {
                    return b - a;
                }
                return a - b; // desc
            }
        }, {

            dataField: 'edit',
            isDummyField: true,
            text: '',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if(row.userCart.length>0){
                        this.viewReservations(row);
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
                details = this.state.resDetails ? this.state.resDetails.userCart : {};
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
                            defaultSorted={defaultSorted}
                        />
                        :
                        <div>
                            <div className="margin-top-bottom">
                                {isManager ? <button className="btn btn-danger" onClick={()=>{this.setState({viewDetails: false, resDetails: ''})}}>חזרה לטבלת המשתמשים</button> : ""}
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
