import React,{useState}from 'react'
import {Box,Card,CardActions,CardContent,Collapse,Button,Typography,Rating,useTheme,useMediaQuery} from "@mui/material"
import { useGetProductsQuery } from 'state/api'
import Header from "components/Header"

const Product = ({
    _id,
    name,
    description,
    price,
    rating,
    category,
    supply,
    stat
})=>{
    const theme= useTheme()
    const [isExpended,setIsExpended] = useState(false)

    return (
        <Card
        sx={{
            backgroundImage:"none",
            backgroundColor:theme.palette.background.alt,
            borderRadius:"0.55rem",
        }}
        >
            <CardContent>
                <Typography
                sx={{fontSize:14}}
                color={theme.palette.secondary[700]}
                gutterBottom
                >
                    {category}
                </Typography>
                <Typography component="div" variant="h5">
                    {name}
                </Typography>
                <Typography sx={{mb:"1.5rem"}}
                color={theme.palette.secondary[400]}
                >${Number(price).toFixed(2)}
                </Typography>
                <Rating value={rating} readOnly />

                <Typography varian="body2">{description}</Typography>
                <CardActions>
                    <Button
                    variant="primary"
                    size="small"
                    onClick={()=>setIsExpended(!isExpended)}
                    >
                     See More
                    </Button>
                </CardActions>
                <Collapse
                in={isExpended}
                timeout="auto"
                unmountOnExit
                sx={{
                    color:theme.palette.neutral[300]
                }}
                >
                    <CardContent>
                        <Typography>
                            id: {_id}
                        </Typography>
                        <Typography>
                            Supply Left: {supply}
                        </Typography>
                        <Typography>
                            Yearly Sales This Year: {stat[0].yearlySalesTotal}
                        </Typography>
                        <Typography>
                            Yearly units Sold This Year: {stat[0].yearlyTotalSoldUnits}
                        </Typography>
                    </CardContent>
                </Collapse>
            </CardContent>

        </Card>
    )
}



const Products = () => {
  const {data,isLoading} = useGetProductsQuery();
  console.log(data)
  const isNonMobile = useMediaQuery("(min-width:1000px)")
  return (
    <Box
    m="1.5rem 2.5rem"
    >
        <Header title="PRODUCTS" subtitle={"See all the list of products"} />
        {data || !isLoading ?(
            <Box
            mt="20px"
            display={"grid"}
            gridTemplateColumns="repeat(4,minmax(0,1fr))"
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
                "& >div":{gridColumn:isNonMobile?undefined:"span 4"}
            }}
            >
                {data.map(({
                    _id,
                    name,
                    description,
                    price,
                    rating,
                    category,
                    supply,
                    stat
                })=>(
                    <Product 
                    _id={ _id}
                    name={name}
                    description={description}
                    price={price}
                    rating={rating}
                    category={category}
                    supply={supply}
                    stat={stat}
                    />
                ))}

            </Box>
        ):<>Loading...</>}
    </Box>
  )
}

export default Products