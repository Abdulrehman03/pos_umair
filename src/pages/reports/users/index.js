import React, { useState, useEffect, useContext } from "react";
import PageWrapper from "../../../components/PageWrapper";
import Badge from "../../../components/Core/Badge";
import { connect } from "react-redux";
import { MDBDataTable } from "mdbreact";
import Router from "next/router";

import { editUser } from "../../../store/actions/auth";
import GlobalContext from "../../../context/GlobalContext";
import { CSVLink } from "react-csv";



const finance = ({
    isAuthenticated,

    allUsers,
    editUser,
    sales
}) => {
    const styles = {
        csvButton: {
            width: "fit-content",
            border: "4px solid",
            padding: "4px",
            float: "right",
            borderRadius: "7px",
            marginTop: "1.1rem",
            fontSize: "13px",
        },
    };
    const gContext = useContext(GlobalContext);
    useEffect(() => {
        if (!isAuthenticated) {
            Router.push("/");
        }

    }, [isAuthenticated]);

    let tabValues = {
        name: "",
        email: "",
        acc_status: ""
    };


    let headings = [
        "Name",
        "Email",
        "Account Status"

    ];
    let allColumns = [];
    Object.keys(tabValues).map((key, index) => {
        let data = {
            label: headings[index],
            field: key,
            width: 200,
        };
        allColumns.push(data);
    });
    let [userRows, setUserRows] = useState([])
    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: "Actions",
                field: "badge",
                width: 150,
            },
            ...allColumns,
        ],
        rows: [],
    });

    useEffect(() => {
        if (sales && allUsers) {
            userRows = []
            setUserRows(userRows)
            console.log("useEffect")

            allUsers.map((user) => {
                let data = {
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    acc_status: user.acc_status == 1 ? "Active" : "Not Active"
                };

                userRows.push(data)
                setUserRows(userRows)
            })
        }
    }, [allUsers, sales])





    useEffect(() => {
        if (userRows) {

            setDatatable({
                ...datatable,
                rows: [
                    ...userRows.map((row, order) => ({
                        ...row,
                        badge: (
                            <>
                                {
                                    row.acc_status == "Active" ? <Badge onClick={() => handleChangeStatus(row)} >Active</Badge> :
                                        <Badge onClick={() => handleChangeStatus(row)} bg='red'>Not Active</Badge>
                                }


                            </>
                        ),
                    })),
                ],
            });
        }
    }, [userRows]);

    const handleChangeStatus = (row) => {
        console.log(row)
        let data = {
            _id: row._id,
            acc_status: row.acc_status == "Active" ? 2 : 1
        }
        console.log(data)
        editUser(data)
    }


    return (
        <PageWrapper
            headerConfig={{
                button: "profile",
                isFluid: true,
                bgClass: "bg-default",
                reveal: false,
            }}
        >
            <div
                className="dashboard-main-container  mt-24 mt-lg-25"
                id="dashboard-body"
            >
                <div className="container">
                    <h5 style={{ color: "#00b074" }}>Users</h5>


                    <MDBDataTable
                        hover
                        entriesOptions={[10, 20, 25]}
                        entries={5}
                        pagesAmount={4}
                        data={datatable}
                        pagingTop
                        searchTop
                        scrollX
                        scrollY
                        maxHeight="70vh"
                        searchBottom={false}
                    />
                </div>
            </div>
        </PageWrapper>
    );
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    allUsers: state.auth.allUsers,
    sales: state.sale.sales,
});
export default connect(mapStateToProps, { editUser })(
    finance
);
