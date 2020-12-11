export const existingCartItem = ({
    prevCartItems,
    nextCartItems
}) => {
    return prevCartItems.find(
        cartItem => cartItem.documentID === nextCartItems.documentID
    );
};

export const handleAddToCart = ({
    prevCartItems,
    nextCartItems
}) => {
    const quantityIncrement = 1;
    const cartItemExists = existingCartItem({ prevCartItems, nextCartItems});

    if (cartItemExists) {
        return prevCartItems.map(cartItem => 
            cartItem.documentID == nextCartItems.documentID
            ? {
                ...cartItem,
                quantity: cartItem.quantity + quantityIncrement
            } : cartItem
            );
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItems,
            quantity: quantityIncrement
        }
    ];
};