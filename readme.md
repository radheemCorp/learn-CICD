id  select_type     table                   partitions  type        possible_keys   keys            key_len     ref     rows    filtered    Extra
1	SIMPLE	        Users		            Null        const	    unique_email	unique_email	258	        const	1	    100.0	
1	SIMPLE	        basic_information		Null        const	    unique_email	unique_email	1023	    const	1	    100.0	
1	SIMPLE	        KYC_details		        Null        const	    unqiue_email	unqiue_email	258	        const	1	    100.0	
1	SIMPLE	        Upload_Docx		        Null        const	    unique_email	unique_email	258	        const	1	    100.0	
1	SIMPLE	        one		                Null        const	    unique_email	unique_email	258	        const	1	    100.0	



id  select_type     table                   partitions  type        possible_keys   keys            key_len     ref     rows    filtered    Extra
1	PRIMARY	        Users		            Null        const	    unique_email	unique_email	258	        const	1	    100.0	
1	PRIMARY	        one		                Null        const	    unique_email	unique_email	258	        const	1	    100.0	
1	PRIMARY	        Upload_Docx		        Null        const	    unique_email	unique_email	258	        const	1	    100.0	
1	PRIMARY	        KYC_details		        Null        const	    unqiue_email	unqiue_email	258	        const	1	    100.0	
1	PRIMARY	        bi		                Null        const	    unique_email	unique_email	1023	    const	1	    100.0	    Using where
1	PRIMARY	        VPS_companies	        Null        eq_ref	    PRIMARY	        PRIMARY	        4	        const	1	    100.0	    Using where
8	SUBQUERY	    bi                      Null        const	    unique_email	unique_email	1023	    const	1	    100.0	