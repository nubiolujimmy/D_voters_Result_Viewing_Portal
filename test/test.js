const Dvot = artifacts.require('./Dvot.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('Dvot', ([deployer, uploader]) => {
  let VoteRecord

  before(async () => {
    VoteRecord = await Dvot.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await VoteRecord.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const dat_N = await VoteRecord.dat_N()
      assert.equal(dat_N, 'Dvot')
    })
  })

  describe('Report', async () => {
    let result, ReportSeries
    const ReportHash = 'QmVrydvb6ythfgnhnmnhunghtyufghgyh'
    const ReportSize = "1"
    const ReportType = 'TypeOfTheFile'
    const ReportName = 'NameOfTheFile'
    const ReportDescription = 'DescriptionOfTheFile'

    before(async () => {
      result = await VoteRecord.uploadReport(ReportHash, ReportSize, ReportType, ReportName, ReportDescription, { from: uploader })
      ReportSeries = await VoteRecord.ReportSeries()
    })

    //check event
    it('upload Report', async () => {
      // SUCESS
      assert.equal(ReportSeries, 1)
      const event = result.logs[0].args
      assert.equal(event.ReportId.toNumber(), ReportSeries.toNumber(), 'Id is correct')
      assert.equal(event.ReportHash, ReportHash, 'Hash is correct')
      assert.equal(event.ReportSize, ReportSize, 'Size is correct')
      assert.equal(event.ReportType, ReportType, 'Type is correct')
      assert.equal(event.ReportName, ReportName, 'Name is correct')
      assert.equal(event.ReportDescription, ReportDescription, 'Description is correct')
      assert.equal(event.uploader, uploader, 'Uploader is correct')

      // FAILURE: File must have hash
      await VoteRecord.uploadReport('', ReportSize, ReportType, ReportName, ReportDescription, { from: uploader }).should.be.rejected;

      // FAILURE: File must have size
      await VoteRecord.uploadReport(ReportHash, '', ReportType, ReportName, ReportDescription, { from: uploader }).should.be.rejected;
      
      // FAILURE: File must have type
      await VoteRecord.uploadReport(ReportHash, ReportSize, '', ReportName, ReportDescription, { from: uploader }).should.be.rejected;

      // FAILURE: File must have name
      await VoteRecord.uploadReport(ReportHash, ReportSize, ReportType, '', ReportDescription, { from: uploader }).should.be.rejected;

      // FAILURE: File must have description
      await VoteRecord.uploadReport(ReportHash, ReportSize, ReportType, ReportName, '', { from: uploader }).should.be.rejected;
    })

    //check from Struct
    it('lists Report', async () => {
      const Reports = await VoteRecord.Reports(ReportSeries)
      assert.equal(Reports.ReportId.toNumber(), ReportSeries.toNumber(), 'id is correct')
      assert.equal(Reports.ReportHash, ReportHash, 'Hash is correct')
      assert.equal(Reports.ReportSize, ReportSize, 'Size is correct')
      assert.equal(Reports.ReportDescription, ReportDescription, 'description is correct')
      assert.equal(Reports.uploader, uploader, 'uploader is correct')
    })
  })
})