import React, { useState, useEffect } from "react";

import PageWrapper from "../../components/PageWrapper";
import { connect } from "react-redux";
import Router from "next/router";
import { editProduct } from "../../store/actions/product";
import { addSale } from "../../store/actions/sale";

import Select from 'react-select';



import Link from 'next/link'
import { constant } from "lodash";

const Sourcing = ({

    isAuthenticated,
    customers,
    products,
    editProduct,
    addSale

}) => {

    let [selectedCustomer, setSelectedCustomer] = useState()
    let [selectedProduct, setSelectedProduct] = useState()
    let [allProducts, setAllProducts] = useState()
    let [allCustomers, setAllCustomers] = useState()

    useEffect(() => {
        if (products) {
            let arr = []
            products.map((product) => {
                if (product.quantity > 0) {
                    let data = {
                        value: product._id,
                        label: product.product_name
                    }
                    arr.push(data)
                }

            })
            setAllProducts(arr)
        }
    }, [products])
    useEffect(() => {
        if (customers) {
            let arr = []
            customers.map((customer) => {

                let data = {
                    value: customer._id,
                    label: customer.customer_name + "  ( " + customer.contact + " )"
                }
                arr.push(data)
            })
            setAllCustomers(arr)
        }
    }, [customers])
    // console.log(allCustomers)

    const [formData, setFormData] = useState({
        customer: "",
        products: [],
        total_price: "",
        pending_payment: "",
        sale_profit: 0,
    });
    useEffect(() => {
        if (!isAuthenticated) {
            Router.push("/");
        }
    }, [isAuthenticated]);

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        // console.log(selectedCustomer)
        formData.customer = selectedCustomer
        formData.pending_payment = formData.total_price
        setFormData({ ...formData, customer: formData.customer, pending_payment: formData.pending_payment })
        console.log(formData.products);
        formData.products.map((item) => {
            let profit = item.cost_price * parseInt(item.selected_quantity)
            profit = item.total_price - profit
            formData.sale_profit = formData.sale_profit + profit
        })


        await addSale(formData)
        formData.products.map(async (item) => {
            console.log(item)
            let quantity = item.quantity - parseInt(item.selected_quantity)
            let data = {
                _id: item._id,
                quantity: quantity
            }
            console.log(data)
            await editProduct(data, "cart")
        })
    };



    const onChangeCustomer = (e) => {

        selectedCustomer = customers.find((customer) => {
            return customer._id == e.value
        })

        setSelectedCustomer(selectedCustomer)
    }


    const onSelectProduct = (e) => {


        let check = formData.products.find((item) => {
            return item._id == e.value
        })

        if (check == undefined) {
            selectedProduct = products.find((product) => {
                return product._id == e.value
            })
            let data = {
                ...selectedProduct,
                selected_quantity: 1,
                total_price: selectedProduct.sale_price
            }
            formData.products.push(data)
            setFormData({ ...formData, products: formData.products })
        }
        updateTotal()

    }
    const handleOnChangeQuantity = (e, product) => {
        let arr = formData.products
        arr.map((item) => {
            if (item._id == product._id) {
                item.total_price = item.sale_price * e.target.value
                item.selected_quantity = e.target.value
            }
        })
        formData.products = arr
        setFormData({ ...formData, products: arr })
        updateTotal()
    }
    const onDeleteProduct = (product) => {
        let arr = formData.products.filter((item) => {
            return item._id != product._id
        })
        console.log(arr)
        formData.products = arr
        setFormData({ ...formData, products: arr })
        updateTotal()
    }
    const updateTotal = () => {
        if (formData.products) {
            let total = 0
            formData.products.map((item) => {
                console.log(item.total_price)
                total = total + item.total_price
            })

            console.log(total)
            formData.total_price = total
            setFormData({ ...formData, total_price: formData.total_price })
        }
    }

    return (
        <>
            <PageWrapper
                headerConfig={{
                    button: "profile",
                    isFluid: true,
                    bgClass: "bg-default",
                    reveal: false,
                }}
            >
                <div
                    className="dashboard-main-container mt-lg-31"
                    id="dashboard-body"
                >
                    <div className="container">
                        <div className="mb-15 mb-lg-23">
                            <div className="row">
                                <div className="col-xxxl-12 px-lg-13 px-6">
                                    <h5 className="font-size-6 font-weight-semibold mb-11">
                                        Add Sale
                                    </h5>
                                    <div className="contact-form bg-white shadow-8 rounded-4 pl-sm-10 pl-4 pr-sm-11 pr-4 pt-15 pb-13">
                                        <form action="" onSubmit={(e) => onSubmit(e)}>
                                            <fieldset>
                                                <div className="row mb-xl-1 mb-9">
                                                    <div className="col-lg-6">
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="aboutTextarea"
                                                                className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                                            >
                                                                Select Customer
                                                          </label>

                                                            <Select onChange={(e) => onChangeCustomer(e)} options={allCustomers} />
                                                        </div>
                                                    </div>
                                                    {
                                                        selectedCustomer && (
                                                            <div className="col-6 col-lg-6">
                                                                {/* <!-- Start Feature One --> */}
                                                                <div className="bg-white px-8 pt-9 pb-7 rounded-4 mb-9 feature-cardOne-adjustments">
                                                                    <div className='row'>
                                                                        <div className="col-6 col-lg-6">
                                                                            <span className=" mb-0 text-gray">
                                                                                No. {selectedCustomer.contact}
                                                                            </span>
                                                                            <h2 className="mt-n4">
                                                                                <Link href="/#">
                                                                                    <a className="font-size-7 text-black-2 font-weight-bold mb-4">
                                                                                        {selectedCustomer.customer_name}
                                                                                    </a>
                                                                                </Link>
                                                                            </h2>
                                                                        </div>
                                                                        <div className="col-6 col-lg-6">
                                                                            <ul className="list-unstyled mb-1 card-tag-list">
                                                                                <li>
                                                                                    <Link href="/#">
                                                                                        <a className="bg-regent-opacity-15 text-denim font-size-3 rounded-3">
                                                                                            <i className="icon icon-pin-3 mr-2 font-weight-bold"></i>{" "}
                                                                                            {selectedCustomer.address}
                                                                                        </a>
                                                                                    </Link>
                                                                                </li>
                                                                                <li>
                                                                                    <Link href="/#">
                                                                                        <a className="bg-regent-opacity-15 text-orange font-size-3 rounded-3">
                                                                                            <i className="fa fa-briefcase mr-2 font-weight-bold"></i>{" "}
                                                                                            {new Date(selectedCustomer.date_created).toLocaleDateString()}
                                                                                        </a>
                                                                                    </Link>
                                                                                </li>

                                                                            </ul>
                                                                        </div>

                                                                    </div>
                                                                </div>
                                                                {/* <!-- End Feature One --> */}
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                                {
                                                    selectedCustomer && (
                                                        <>
                                                            <div className="row">
                                                                <div className="col-md-12">
                                                                    <label
                                                                        htmlFor="aboutTextarea"
                                                                        className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                                                    >
                                                                        Select Product
                                                          </label>
                                                                    <Select onChange={(e) => onSelectProduct(e)} options={allProducts} />
                                                                </div>
                                                            </div>

                                                            <>
                                                                <div className="row">
                                                                    <div className="table-responsive mt-10 ml-5">
                                                                        <table className="table table-striped">
                                                                            <thead>
                                                                                <tr>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="pl-0  border-0 font-size-4 font-weight-normal"
                                                                                    >
                                                                                        Action
                                                                          </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="pl-0  border-0 font-size-4 font-weight-normal"
                                                                                    >
                                                                                        Product Name
                                                                          </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="border-0 font-size-4 font-weight-normal"
                                                                                    >
                                                                                        Avalible
                                                                           </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="border-0 font-size-4 font-weight-normal"
                                                                                    >
                                                                                        Item Price
                                                                   </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="border-0 font-size-4 font-weight-normal"
                                                                                    >
                                                                                        Quantity
                                                                   </th>
                                                                                    <th
                                                                                        scope="col"
                                                                                        className="border-0 font-size-4 font-weight-normal"
                                                                                    >
                                                                                        Total
                                                                   </th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {
                                                                                    formData.products.map((product) => (
                                                                                        <tr className="border border-color-2">
                                                                                            <td className="table-y-middle py-7 min-width-px-100">
                                                                                                <a

                                                                                                    onClick={e => onDeleteProduct(product)}
                                                                                                    className="font-size-3 font-weight-bold text-red-2 text-uppercase"
                                                                                                >
                                                                                                    Delete
                                                                                 </a>
                                                                                            </td>
                                                                                            <td>{product.product_name}</td>
                                                                                            <td>{product.quantity}</td>
                                                                                            <td>{product.sale_price}</td>
                                                                                            <td>
                                                                                                <input type="number" style={{ width: '50px' }} onChange={e => handleOnChangeQuantity(e, product)} value={product.selected_quantity} min='1' max={product.quantity} />
                                                                                            </td>
                                                                                            <td>
                                                                                                {product.total_price}
                                                                                            </td>
                                                                                        </tr>
                                                                                    ))
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                                <div className="row">

                                                                    <div className="col-md-6">
                                                                        <label
                                                                            htmlFor="aboutTextarea"

                                                                            className="d-block text-black-2 font-size-4 font-weight-semibold mb-4"
                                                                        >
                                                                            Total Bill
                                                          </label>
                                                                        <input
                                                                            disabled
                                                                            value={formData.total_price}
                                                                            className="form-control h-px-48 w-75"
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className="row" style={{ justifyContent: 'flex-end' }}>
                                                                    <div className="">
                                                                        <input
                                                                            type="button"
                                                                            value="Create"
                                                                            type="submit"
                                                                            className="btn btn-green btn-h-60 text-white min-width-px-210 rounded-5 text-uppercase"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </>
                                                        </>
                                                    )
                                                }
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </>
    );
};
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    customers: state.customer.customers,
    products: state.product.products

});
export default connect(mapStateToProps, { editProduct, addSale })(Sourcing);
