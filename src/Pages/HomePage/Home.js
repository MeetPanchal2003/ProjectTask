import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function Home() {
  return (
    <div>
      <section class="pt-5 pb-5">
        <div class="container">
          <div class="row">
            <div class="col-6">
              <h3 class="mb-3">Carousel cards title </h3>
            </div>
            <div class="col-12">
              <div
                id="carouselExampleIndicators2"
                class="carousel slide"
                data-ride="carousel"
              >
                <div class="carousel-inner">
                  <div class="carousel-item active">
                    <div class="row">
                      <div class="col-md-6 mb-3">
                        <div class="card">
                          <div class="card-body">
                            <h4 class="card-title">Special title treatment</h4>
                            <p class="card-text">
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 mb-3">
                        <div class="card">
                          <div class="card-body">
                            <h4 class="card-title">Special title treatment</h4>
                            <p class="card-text">
                              With supporting text below as a natural lead-in to
                              additional content.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
