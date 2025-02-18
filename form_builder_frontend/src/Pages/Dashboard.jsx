import React from 'react'

export default function Dashboard() {
  return (
    <>
      <div class="row">
        <div class="col-xl-3 col-md-6 mb-4">
          <h3>Dashboard</h3>
          <div class="card border-left-success shadow py-2">
            <div class="card-body">
              <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                  <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Earnings (Annual)</div>
                  <div class="h5 mb-0 font-weight-bold text-gray-800">$215,000</div>
                </div>
                <div class="col-auto">
                  <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>

  )
}
