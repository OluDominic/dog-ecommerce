import gql from "graphql-tag";
import { graphql } from "react-apollo";

const PRODUCT_QUERY = gql`
    query {
        productsList {
            items {
                id
                createdAt
                name
                price
                description
                age
                image {
                    downloadUrl
                }
            }
        }
    }
    `
    export default PRODUCT_QUERY;