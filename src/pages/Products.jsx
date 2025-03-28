import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/category/categoriesSlice";
import { fetchProducts } from "../redux/product/productSlice";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputAdornment,
  OutlinedInput,
  Radio,
  RadioGroup,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import { CiSearch } from "react-icons/ci";
import ProductCard from "../components/ProductCard";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../components/CategoriesAccodianStyle";

const Products = () => {
  const dispatch = useDispatch();
  const { products, status: productsStatus } = useSelector(
    (state) => state.products
  );
  const { categories, status: categoriesStatus } = useSelector(
    (state) => state.categories
  );

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rating, setRating] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, []);

  const handleCategory = (category) => {
    console.log("category", category);
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filterProducts = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(search.toLocaleLowerCase()) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1] &&
      (selectedCategories.length > 0
        ? selectedCategories.includes(product.category)
        : true) &&
      (rating === "" || parseInt(product.rating.rate) == parseInt(rating))
    );
  });

  const clearFilterHandler = () => {
    setSearch("");
    setSelectedCategories([]);
    setRating("");
    setPriceRange([0, 1000]);
  };

  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Box sx={{ display: "inline-block", width: "100%", mt: 3 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 5, md: 3 }}>
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  All Categories
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedCategories.includes(category)}
                            onChange={() => handleCategory(category)}
                            sx={{ "& .MuiSvgIcon-root": { fontSize: 18 } }}
                          />
                        }
                        label={category}
                        key={category}
                        sx={{
                          "& .MuiFormControlLabel-label": {
                            fontSize: "14px",
                          },
                        }}
                      />
                    ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel2"}
              onChange={handleChange("panel2")}
            >
              <AccordionSummary
                aria-controls="panel2d-content"
                id="panel2d-header"
              >
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  Prices
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack>
                  <Typography variant="h6" sx={{ fontSize: "14px", pb: 1 }}>
                    $0 - $100
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "14px", pb: 1 }}>
                    $100 - $200
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "14px", pb: 1 }}>
                    $200 - $300
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "14px", pb: 1 }}>
                    $300 - $500
                  </Typography>
                  <Typography variant="h6" sx={{ fontSize: "14px", pb: 1 }}>
                    $500 - $1000
                  </Typography>

                  <Stack direction="row" gap={2} alignItems="center">
                    <FormControl variant="outlined">
                      <OutlinedInput
                        id="min"
                        aria-describedby="min"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                        placeholder="$min"
                        sx={{ height: "36px" }}
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([+e.target.value, priceRange[1]])
                        }
                      />
                    </FormControl>

                    <Typography
                      variant="h6"
                      sx={{ fontSize: "16px", color: "#a6a6a6" }}
                    >
                      -
                    </Typography>

                    <FormControl variant="outlined">
                      <OutlinedInput
                        id="max"
                        aria-describedby="max"
                        inputProps={{
                          "aria-label": "weight",
                        }}
                        placeholder="$max"
                        sx={{ height: "36px" }}
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], +e.target.value])
                        }
                      />
                    </FormControl>
                  </Stack>
                </Stack>
              </AccordionDetails>
            </Accordion>
            <Accordion
              expanded={expanded === "panel3"}
              onChange={handleChange("panel3")}
            >
              <AccordionSummary
                aria-controls="panel3d-content"
                id="panel3d-header"
              >
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  Rating
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                >
                  {["1", "2", "3", "4", "5"].map((item, idx) => (
                    <FormControlLabel
                      value={item}
                      control={
                        <Radio
                          sx={{
                            "& .MuiSvgIcon-root": {
                              fontSize: 16,
                            },
                          }}
                        />
                      }
                      label={
                        <Rating
                          name="read-only"
                          value={Number(item)}
                          readOnly
                          size="small"
                          sx={{ color: "#ed7534" }}
                        />
                      }
                      sx={{ alignItems: "baseline" }}
                      key={idx}
                    />
                  ))}
                </RadioGroup>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ mt: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  textTransform: "capitalize",
                  borderColor: "#e5e5e5",
                  color: "black",
                }}
                onClick={clearFilterHandler}
              >
                Clear Filters
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, sm: 7, md: 9 }}>
            <Stack>
              <FormControl variant="outlined" sx={{ mb: 2 }}>
                <OutlinedInput
                  id="outlined-adornment-weight"
                  startAdornment={
                    <InputAdornment position="start">
                      <CiSearch />
                    </InputAdornment>
                  }
                  aria-describedby="outlined-weight-helper-text"
                  inputProps={{
                    "aria-label": "weight",
                  }}
                  placeholder="Search Products"
                  sx={{ height: "42px" }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </FormControl>

              {productsStatus === "loading" && (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                    mt: 6,
                  }}
                >
                  <CircularProgress />
                </Box>
              )}

              <Grid container spacing={2}>
                {filterProducts.length > 0 &&
                  filterProducts.map((product) => (
                    <Grid size={{ md: 12, md: 4 }} key={product.id}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
              </Grid>

              {filterProducts.length === 0 && productsStatus !== "loading" && (
                <Stack direction={"row"} justifyContent={"center"} mt={6}>
                  <Typography variant="h6" sx={{ fontSize: "16px" }}>
                    Product Not Found !
                  </Typography>
                </Stack>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Products;
