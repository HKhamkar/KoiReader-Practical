import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Card sx={{ width: "100%" }}>
      <CardMedia
        component="img"
        sx={{ height: 200, objectFit: "contain" }}
        image={product.image}
        title="green iguana"
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            fontSize: "18px",
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
            minHeight: "48px",
          }}
        >
          {product.title}
        </Typography>

        <Stack direction="row" alignItems="center" gap={1} mb={1}>
          <Rating
            name="read-only"
            value={parseInt(product.rating.rate)}
            readOnly
            size="small"
            sx={{ color: "#ed7534" }}
          />
          <Typography variant="caption">
            {`(${product.rating.count})`}
          </Typography>
        </Stack>

        <Typography
          variant="caption"
          sx={{
            p: 0.5,
            background: "#edeaea",
            borderRadius: "5px",
          }}
        >
          {product.category}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            my: 1,
            color: "text.secondary",
            fontSize: "14px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {product.description}
        </Typography>

        <Typography
          variant="h6"
          sx={{ fontSize: "20px", fontWeight: 600, mb: 2 }}
        >
          {`$ ${product.price}`}
        </Typography>

        <Stack direction="row" gap={1}>
          <Button
            variant="contained"
            sx={{
              width: "70%",
              whiteSpace: "nowrap",
              textTransform: "none",
              background: "#ed7534",
            }}
          >
            Buy now
          </Button>
          <Button
            variant="text"
            sx={{
              width: "100%",
              whiteSpace: "nowrap",
              textTransform: "none",
              color: "#ed7534",
              ":hover": {
                background: "transparent",
              },
            }}
          >
            Add to cart
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
