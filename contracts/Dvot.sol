// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.22 <0.9.9;
contract Dvot {
string public dat_N = "Dvot";

uint256 public ReportSeries = 0;
	  mapping(uint => Report) public Reports;
	

	  struct Report {
	    uint ReportId;
	    string ReportHash;
	    uint ReportSize;
	    string ReportType;
	    string ReportName;
	    string ReportDescription;
	    uint uploadTime;
	    address  uploader;
	  }
	  event ReportUploaded(
	    uint ReportId,
	    string ReportHash,
	    uint ReportSize,
	    string ReportType,
	    string ReportName, 
	    string ReportDescription,
	    uint uploadTime,
	    address  uploader 
	  );
    
	  function uploadReport(string memory _ReportHash, uint _ReportSize, string memory _ReportType, string memory _ReportName, string memory _ReportDescription) public {
	    require((bytes(_ReportHash).length >= 1)&&(bytes(_ReportType).length >=1)&&(bytes(_ReportDescription).length >= 1)&&(bytes(_ReportName).length >= 1)&&(msg.sender!=address(0))&&(_ReportSize>=1));
	    ReportSeries = ReportSeries + 1;
	
	    Reports[ReportSeries] = Report(ReportSeries, _ReportHash, _ReportSize, _ReportType, _ReportName, _ReportDescription, block.timestamp, msg.sender);
	    emit ReportUploaded(ReportSeries, _ReportHash, _ReportSize, _ReportType, _ReportName, _ReportDescription, block.timestamp, msg.sender);
	  }
	}
