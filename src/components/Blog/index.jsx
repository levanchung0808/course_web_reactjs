import * as React from "react";
import Footer from "./Components/Footer";
import { Button, Container, Skeleton, Stack, Typography } from "@mui/material";
import { useMainValues } from "../../contexts/MainContext";
import ItemDanhSachBaiViet from "./Components/ItemDanhSachBaiViet";
import authAPI from "../../api/BaiVietAPI";
import Secondary from "./Components/Secondary";

function Blog() {
  const { isMediumScreen } = useMainValues();
  const [dataBaiVietNoiBat, setDataBaiVietNoiBat] = React.useState([]);
  const [dataBaiViet, setDataBaiViet] = React.useState([]);
  const itemLoadingSkeletonDataBaiViet = 4;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await authAPI.getPosts(1, 10, "created_at");
        console.log("response: ", response);
        if (response.status === 200) {
          setDataBaiViet(response.data.results);
        }
      } catch (e) {
        console.log("error: ", e);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="App">
      <Stack
        width={"100%"}
        direction={"row"}
        justifyContent={"center"}
        backgroundColor={"#fff"}
      >
        <Stack
          width={isMediumScreen ? "100%" : "60%"}
          direction={isMediumScreen ? "column" : "row"}
          justifyContent={"center"}
          alignItems={"flex-start"}
        >
          {/* PRIMARY */}
          <Stack
            width={isMediumScreen ? "100%" : "70%"}
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            {/* List bài viết */}
            {dataBaiViet.length > 0 ? (
              dataBaiViet.map((item, index) => {
                return <ItemDanhSachBaiViet dataItem={item} key={index} />;
              })
            ) : dataBaiViet.length == 0 ? (
              <Stack
                width={"100%"}
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                spacing={1.25}
              >
                <Typography
                  align="center"
                  fontSize={22}
                  fontFamily={"Montserrat"}
                  fontWeight={"Medium"}
                  color={"#000"}
                  opacity={0.8}
                  textTransform={"uppercase"}
                >
                  Không có bài viết nào
                </Typography>
              </Stack>
            ) : (
              //loop 4
              [...Array(itemLoadingSkeletonDataBaiViet)].map((index) => {
                return (
                  <Stack
                    key={index}
                    width={"100%"}
                    direction={"column"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    px={2.5}
                    spacing={0}
                  >
                    <Skeleton
                      width={"100%"}
                      height={50}
                      variant="text"
                      sx={{ fontSize: "20px" }}
                    />
                    <Skeleton width={"10%"} variant="text" />
                    <Skeleton
                      width={"100%"}
                      variant="text"
                      sx={{ fontSize: "20px" }}
                    />
                    <Skeleton
                      variant="rectangular"
                      width={"100%"}
                      height={200}
                    />
                    <Skeleton width={"100%"} height={40} />
                    <Skeleton width={"40%"} height={50} />
                  </Stack>
                );
              })
            )}

            <Button
              variant="contained"
              sx={{
                borderRadius: "8px",
                color: "#ddd",
                bgcolor: "#000",
                textTransform: "initial",
                fontSize: "16px",
              }}
            >
              Xem các bài cũ hơn
            </Button>
          </Stack>

          {/* SECONDARY */}
          <Secondary />
        </Stack>
      </Stack>
      {/* Chừa khoảng cách footer */}
      <div style={{ marginBottom: "50px" }}></div>
      <Footer />
    </div>
  );
}

export default Blog;
